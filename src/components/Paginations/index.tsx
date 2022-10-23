import Pagination, { PaginationProps } from 'rc-pagination';

interface IPaginations extends PaginationProps {
	pageIndex: number;
	pageSize: number;
	onChange: (page: number) => void;
	total: number;
}
const Paginations = (props: IPaginations) => {
	const { pageIndex, pageSize, total, onChange } = props;
	console.log('onchange ', pageIndex);
	return (
		<Pagination
			current={pageIndex}
			pageSize={pageSize}
			onChange={onChange}
			total={total}
			style={{ margin: ' 100px' }}
		/>
	);
};

export default Paginations;
