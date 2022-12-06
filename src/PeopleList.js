import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Pages from './Pages.js';
import People from './People.js';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function PeopleList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [people, setPeople] = useState(null);
  const [perPage, setPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchFor, setSearchFor] = useState('');
    
  useEffect(() => {
    fetch("http://apis.chromeye.com:9191/people")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPeople(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
    )
  }, []);

  const handleChange = (event) => {
    setPerPage(event.target.value - 0);
    setCurrentPage(0);
    const buttons = document.getElementsByClassName('button');
    Array.from(buttons).forEach((b) => b.classList.remove('activePage'));
    buttons[0].classList.add('activePage');
  };

  const handleFilterChange = (event) => {
    setSearchFor(event.target.value.toLowerCase());
    setCurrentPage(0);
    const buttons = document.getElementsByClassName('button');
    Array.from(buttons).forEach((b) => b.classList.remove('activePage'));
    buttons[0].classList.add('activePage');
  }
  
  if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="peopleTable">
            <div className='topPart'>
              <TextField id="outlined-basic" className='filterInput' label="Outlined" variant="outlined" onKeyUp={handleFilterChange} />
              <Pages
                data={people.filter((person) => person.firstName.toLowerCase().includes(searchFor) || person.lastName.toLowerCase().includes(searchFor))}
                perPage={perPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
              <FormControl>
                  <InputLabel id="demo-simple-select-label">Per Page</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className='perPage'
                      value={perPage}
                      label="Per Page"
                      onChange={handleChange}
                  >
                      <MenuItem value="1">--- 1 ---</MenuItem>
                      <MenuItem value="3">--- 3 ---</MenuItem>
                      <MenuItem value="5">--- 5 ---</MenuItem>
                      <MenuItem value={people.length}>-- All --</MenuItem>
                  </Select>
              </FormControl>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Avartar</StyledTableCell>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>First Name</StyledTableCell>
                        <StyledTableCell>Last Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Company</StyledTableCell>
                        <StyledTableCell>Department</StyledTableCell>
                        <StyledTableCell>Start Date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  <People
                    data={people.filter((person) => person.firstName.toLowerCase().includes(searchFor) || person.lastName.toLowerCase().includes(searchFor))}
                    perPage={perPage}
                    currentPage={currentPage} />
                </TableBody>
                </Table>
            </TableContainer>
        </div>
      );
  }
}

export default PeopleList;