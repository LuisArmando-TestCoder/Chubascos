import React from 'react';

import * as Components from '../components';

export default {
	title: 'strings/ContainerDecorator',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.strings.ContainerDecorator>
			{title}
		</Components.strings.ContainerDecorator>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'ContainerDecorator',
};
