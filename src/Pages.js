import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

function Pages({data, perPage, currentPage, setCurrentPage}) {
    const pagesCount = Math.ceil(data.length / perPage) - 1;
    const buttons = [];

    for (let i = 0; i <= pagesCount; i++) {
        buttons.push(i + 1);
    }

    const changePage = (pageIndex) => {
        setCurrentPage(pageIndex);
        const buttons = document.getElementsByClassName('button');
        Array.from(buttons).forEach((b) => b.classList.remove('activePage'));
        buttons[pageIndex].classList.add('activePage');
    };

    const previousPage = () => {
        if (currentPage > 0) {
            changePage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== pagesCount) {
            changePage(currentPage + 1);
        } 
    };

    return (
        <div className='pagination'>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                {buttons.map((button, index) => (<Button key={index} onClick={() => {changePage(index)}} className='button'>{button}</Button>))}
            </ButtonGroup>
            <ButtonGroup variant="text" aria-label="text button group">
                <Button className='button prevPageButton' onClick={previousPage} disabled={currentPage === 0}>&lt;</Button>
                <Button className='button nextPageButton' onClick={nextPage} disabled={currentPage === pagesCount}>&gt;</Button>
            </ButtonGroup>
        </div>
    );
}

export default Pages;