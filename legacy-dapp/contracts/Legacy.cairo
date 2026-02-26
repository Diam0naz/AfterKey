#[starknet::interface]
pub trait ILegacy<TContractState> {
    fn ping_heartbeat(ref self: TContractState);
    fn set_plan(ref self: TContractState, plan_type: u8);
    fn add_trustee(ref self: TContractState, trustee: starknet::ContractAddress);
    fn approve_legacy(ref self: TContractState);
    fn execute_legacy(ref self: TContractState);
    fn get_status(self: @TContractState) -> (bool, u32, u32, u64, u8);
    fn get_trustee_count(self: @TContractState) -> u32;
}

#[starknet::contract]
mod Legacy {
    use core::integer::u64;
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};


    #[storage]
    struct Storage {
        owner: ContractAddress,
        legacy_executed: bool,
        active_plan: u8,
        last_owner_activity: u64,
        trustee_count: u32,
        #[feature("deprecated_legacy_map")]
        trustees: LegacyMap<u32, ContractAddress>,
        #[feature("deprecated_legacy_map")]
        approvals: LegacyMap<ContractAddress, bool>,
        required_approvals: u32,
        warning_duration: u64,
        dormant_duration: u64,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, required_approvals: u32) {
        self.owner.write(owner);
        self.required_approvals.write(required_approvals);
        self.last_owner_activity.write(get_block_timestamp());
        self.active_plan.write(1); // Default 6 months
        self.warning_duration.write(2592000); // 30 Days
        self.dormant_duration.write(604800); // 7 Days
    }

    #[abi(per_item)]
    impl LegacyImpl of ILegacy<ContractState> {
        fn ping_heartbeat(ref self: ContractState) {
            assert(get_caller_address() == self.owner.read(), 'ONLY_OWNER');
            self.last_owner_activity.write(get_block_timestamp());
        }

        fn set_plan(ref self: ContractState, plan_type: u8) {
            assert(get_caller_address() == self.owner.read(), 'ONLY_OWNER');
            assert(plan_type >= 1 && plan_type <= 3, 'INVALID_PLAN');
            self.active_plan.write(plan_type);
        }

        fn add_trustee(ref self: ContractState, trustee: ContractAddress) {
            assert(get_caller_address() == self.owner.read(), 'ONLY_OWNER');
            let current_count = self.trustee_count.read();
            self.trustees.write(current_count, trustee);
            self.trustee_count.write(current_count + 1);
        }

        fn approve_legacy(ref self: ContractState) {
            let caller = get_caller_address();
            self.approvals.write(caller, true);
        }

        fn execute_legacy(ref self: ContractState) {
            assert(!self.legacy_executed.read(), 'ALREADY_EXECUTED');
            let now = get_block_timestamp();
            let last_active = self.last_owner_activity.read();
            let plan = self.active_plan.read();

            let plan_duration: u64 = match plan {
                1 => 15552000,
                2 => 31104000,
                3 => 93312000,
                _ => 15552000,
            };

            let total_wait = plan_duration
                + self.warning_duration.read()
                + self.dormant_duration.read();
            assert(now >= (last_active + total_wait), 'VAULT_LOCKED');

            self.legacy_executed.write(true);
        }

        fn get_status(self: @ContractState) -> (bool, u32, u32, u64, u8) {
            let mut count: u32 = 0;
            let total = self.trustee_count.read();
            let mut i: u32 = 0;
            loop {
                if i == total {
                    break;
                }
                if self.approvals.read(self.trustees.read(i)) {
                    count += 1;
                }
                i += 1;
            }

            (
                self.legacy_executed.read(),
                count,
                self.required_approvals.read(),
                self.last_owner_activity.read(),
                self.active_plan.read(),
            )
        }

        fn get_trustee_count(self: @ContractState) -> u32 {
            self.trustee_count.read()
        }
    }
}
