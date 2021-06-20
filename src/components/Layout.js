import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width : 100%
`;

const Layout = ({children}) => (
    <Wrapper>
        {children}
    </Wrapper>
);

export default Layout;