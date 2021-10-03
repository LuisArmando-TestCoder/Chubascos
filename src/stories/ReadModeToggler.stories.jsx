import React from 'react';

import * as Components from '../components';

export default {
	title: 'quarks/ReadModeToggler',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.quarks.ReadModeToggler>
			{title}
		</Components.quarks.ReadModeToggler>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'ReadModeToggler',
};
