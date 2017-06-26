import styled from 'styled-components';

export const List = styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 16px 0 0 0;
    list-style-type: none;
    padding: 0;
`

export const ListItem = styled.li`
    position: relative;
    display: block;
    padding: 8px;
    margin-bottom: 16px;
    background-color: ${props => props.owner ? '#4db6ac' : '#e5e5e5'};
    height: 36px;
    color: rgba(0, 0, 0, 0.87);
    border-radius: 2px;
    line-height: 36px;
    font-size: 15px;
`

export const ScreenName = styled.span`
    position: absolute;
    bottom: 0;
    height: 16px;
    padding: 4px;
    background-color: ${props => props.owner ? '#80cbc4' : '#f5f5f5'};
    right: 0;
    color: rgba(0, 0, 0, 0.87);
    line-height: initial;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
`