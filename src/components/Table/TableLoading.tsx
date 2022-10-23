interface ITableLoading {
	width?: number;
	height?: number;
	borderRadius?: number;
	color: string;
}
const TableLoading = (props: ITableLoading) => {
	const { width, height, borderRadius, color } = props;
	return (
		<div className="flex flex-col justify-center gap-0.5 animate-pulse h-full w-full">
			<div style={{ width, height, borderRadius, background: color }}></div>
			<div className="w-24 h-1.5 rounded-md" style={{ background: color }}></div>
		</div>
	);
};

export default TableLoading;
