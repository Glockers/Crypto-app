import { FC, ReactElement, ReactNode } from "react";
import Header from "./Header";
import { styled } from "styled-components";


const Container = styled.div`
heigh: 100px;
weight: 100px;
`

interface IProps {
    children: ReactNode,
}

const Layout: FC<IProps> = ({children}): ReactElement=>{

    return (
        <Container>
            {children}
        </Container>
    )
}

export default Layout;