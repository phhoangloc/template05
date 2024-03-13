import Archive from '@/component/display/archive'
import Box from '@/component/display/box'
import Grid from '@/component/display/grid'
import React from 'react'

const page = () => {
    return (
        <Archive>
            <Grid>
                <Box cn='xs12 sm6 md4 lg3' bg boxShadow>1</Box>
                <Box cn='xs12 sm6 md4 lg3' bg boxShadow>2</Box>
                <Box cn='xs12 sm6 md4 lg3' bg boxShadow>3</Box>
                <Box cn='xs12 sm6 md4 lg3' bg boxShadow>4</Box>
                <Box cn='xs12 sm6 md4 lg3' bg boxShadow>5</Box>
                <Box cn='xs12 sm6 md4 lg3' bg boxShadow>6</Box>
                <Box cn='xs12 sm6 md4 lg3' bg boxShadow>7</Box>
                <Box cn='xs12 sm6 md4 lg3' bg boxShadow>8</Box>
            </Grid>
        </Archive>
    )
}

export default page