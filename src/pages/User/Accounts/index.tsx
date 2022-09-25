import Collapse from '@/components/Collapse';

const AccountsTab = () => {
	const dummyData = [
		{
			label: 'label 1',
			value: 'label 1',
		},
		{
			label: 'label 2',
			value: 'label 2',
		},
		{
			label: 'label 3',
			value: 'label 3',
		},
		{
			label: 'label 4',
			value: 'label 4',
		},
		{
			label: 'label 5',
			value: 'label 5',
		},
		{
			label: 'label 6',
			value: 'label 6',
		},
	];
	return (
		<>
			<Collapse
				label="Region"
				name="Search"
				placeholder="Search"
				isSearchForm
				defaultCollapsed
				options={dummyData}
				onSelectOptions={(e) =>
					console.log(
						'e',
						e.map((opt) => ({
							value: opt.value,
							label: opt.label,
						}))
					)
				}
			/>
			{/* <Collapse
				label="Country"
				name="Search"
				placeholder="Search"
				isSearchForm
				onSelectOptions={}
			/> */}
		</>
	);
};

export default AccountsTab;
