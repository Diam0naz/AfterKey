#[starknet::interface]
trait ILegacy<TContractState> {
    fn ping_heartbeat(ref self: TContractState);
    fn set_plan(ref self: TContractState, plan_type: u8);
    fn execute_legacy(ref self: TContractState);
    fn get_status(self: @TContractState) -> (bool, u32, u32, u64, u8);
}

#[starknet::contract]
mod Legacy {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use core::integer::u64;

    #[storage]
    struct Storage {
        owner: ContractAddress,
        legacy_executed: bool,
        
        // Plan Settings: 1 = 6mo, 2 = 1yr, 3 = 3yr
        active_plan: u8, 
        last_owner_activity: u64,
        
        // Thresholds
        trustee_count: u32,
        required_approvals: u32,
        
        // Durations (in seconds)
        warning_duration: u64, // e.g., 30 days
        dormant_duration: u64, // e.g., 7 days
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        required_approvals: u32,
    ) {
        self.owner.write(owner);
        self.legacy_executed.write(false);
        self.required_approvals.write(required_approvals);
        self.active_plan.write(1); // Default to 6 months
        self.last_owner_activity.write(get_block_timestamp());
        
        // Default Durations
        self.warning_duration.write(2592000); // 30 Days
        self.dormant_duration.write(604800);  // 7 Days
    }

    #[external(v0)]
    impl LegacyImpl of ILegacy<ContractState> {
        
        // The "Heartbeat" - Owner calls this to reset the clock
        fn ping_heartbeat(ref self: ContractState) {
            let caller = get_caller_address();
            assert(caller == self.owner.read(), 'ONLY_OWNER');
            self.last_owner_activity.write(get_block_timestamp());
        }

        // Change the 3%, 5%, or 12% plan
        fn set_plan(ref self: ContractState, plan_type: u8) {
            let caller = get_caller_address();
            assert(caller == self.owner.read(), 'ONLY_OWNER');
            assert(plan_type >= 1 && plan_type <= 3, 'INVALID_PLAN');
            self.active_plan.write(plan_type);
        }

        fn execute_legacy(ref self: ContractState) {
            assert(!self.legacy_executed.read(), 'ALREADY_EXECUTED');
            
            let now = get_block_timestamp();
            let last_active = self.last_owner_activity.read();
            let plan = self.active_plan.read();
            
            // Calculate plan duration in seconds
            let plan_duration: u64 = match plan {
                1 => 15552000, // 6 Months
                2 => 31104000, // 1 Year
                3 => 93312000, // 3 Years
                _ => 15552000,
            };

            let total_wait = plan_duration + self.warning_duration.read() + self.dormant_duration.read();
            
            // Condition: Time has passed OR Trustees have approved (logic for trustees simplified here)
            assert(now >= (last_active + total_wait), 'VAULT_LOCKED');

            // FEE LOGIC MOCKUP
            // let fee_percent = match plan { 1 => 3, 2 => 5, 3 => 12, _ => 3 };
            // In a real app, you would use an ERC20 dispatcher to transfer:
            // (TotalAsset * fee_percent / 100) -> AfterKey Treasury
            // Remaining -> Recipient

            self.legacy_executed.write(true);
        }

        fn get_status(self: @ContractState) -> (bool, u32, u32, u64, u8) {
            (
                self.legacy_executed.read(),
                0, // approvals_count placeholder
                self.required_approvals.read(),
                self.last_owner_activity.read(),
                self.active_plan.read()
            )
        }
    }
}
