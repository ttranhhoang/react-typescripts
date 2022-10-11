import { TYPE_ICONS } from '@/ultils/icons';
import { HTMLAttributes } from 'react';
import Icon from '../Icon';

interface IActionButton extends HTMLAttributes<HTMLDivElement> {
	typeIcon: TYPE_ICONS;
	titleAction: string;
	color?: string;
	width?: string;
	height?: string;
}

const ActionButton = (props: IActionButton) => {
	const { titleAction, typeIcon, color, height, width, ...otherProps } = props;
	return (
		<div {...otherProps} className="flex gap-1.5 items-center w-full">
			<span className="inline-block rounded-full bg-dgray p-1">
				<Icon type={typeIcon} color={color} width={width} height={height} />
			</span>
			<p className="text-secondary text-xs font-bold normal-case truncate">{titleAction}</p>
		</div>
	);
};

export default ActionButton;
