import CollapsibleFilter from '@/components/Collapse';

const AccountsTab = () => {
	return (
		<>
			<CollapsibleFilter
				label="Region"
				name="Search"
				placeholder="Search"
				isSearchForm
				defaultCollapse
			/>
			<CollapsibleFilter label="Country" name="Search" placeholder="Search" isSearchForm />
		</>
	);
};

export default AccountsTab;
