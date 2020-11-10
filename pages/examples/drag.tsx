import { Box } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { ReactElement, useEffect, useState } from 'react';

const Draggable = styled(motion.div)`
    /* position: absolute; */
    width: 150px;
    height: 150px;
    background: #ccffcc;
`;

interface Props {}

export default function Drag({}: Props): ReactElement {
    const [state, setState] = useState();

    useEffect(() => {
        console.log(state);
    }, []);
    return (
        <Box w="300px" h="300px" bg="#ffccff">
            <Draggable drag />
        </Box>
    );
}
