import React from 'react';

import * as Components from '../components';

export default {
	title: 'strings/Search',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.strings.Search>
			{title}
		</Components.strings.Search>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'Search',
};
