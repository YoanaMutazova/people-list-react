import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function People({data, perPage, currentPage}) {
    const peopleOnPage = data.slice(currentPage * perPage,  currentPage * perPage + perPage);

    return (  
        peopleOnPage.map((person) =>
            <StyledTableRow key={person.id}>
                <StyledTableCell component="th" scope="row">
                    <img src={'http://apis.chromeye.com:9191' + person.avatar.url} alt={person.avatar.name}/>
                </StyledTableCell>
                <StyledTableCell>{person.id}</StyledTableCell>
                <StyledTableCell>{person.firstName}</StyledTableCell>
                <StyledTableCell>{person.lastName}</StyledTableCell>
                <StyledTableCell>{person.email}</StyledTableCell>
                <StyledTableCell>{person.company.name}</StyledTableCell>
                <StyledTableCell>{person.company.department}</StyledTableCell>
                <StyledTableCell>{person.company.startDate}</StyledTableCell>
            </StyledTableRow>
        ) 
    );
}

export default People;