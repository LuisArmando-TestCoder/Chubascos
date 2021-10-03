import React from 'react';

import * as Components from '../components';

export default {
	title: 'strings/Icon',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.strings.Icon>
			{title}
		</Components.strings.Icon>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'Icon',
};
