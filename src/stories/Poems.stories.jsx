import React from 'react';

import * as Components from '../components';

export default {
	title: 'atoms/Poems',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.atoms.Poems>
			{title}
		</Components.atoms.Poems>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'Poems',
};
