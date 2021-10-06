import React from 'react';

import * as Components from '../components';

export default {
	title: 'quarks/SelectEmotion',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.quarks.SelectEmotion>
			{title}
		</Components.quarks.SelectEmotion>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'SelectEmotion',
};
