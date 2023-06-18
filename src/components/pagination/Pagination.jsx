// import React from 'react';
// import { Button, Stack } from '@mui/material';

// const Pagination = ({ proceduresPerPage, totalProcedures, currentPage, paginate }) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(totalProcedures / proceduresPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const handleClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     onPageChange(pageNumber);
//   };

//   return (
//     <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//       {pageNumbers.map((number) => (
//         <Button
//           key={number}
//           variant={number === currentPage ? 'contained' : 'outlined'}
//           onClick={() => handleClick(number)}
//         >
//           {number}
//         </Button>
//       ))}
//     </Stack>
//   );
// };

// export default Pagination;

// import React from 'react';
// import { Pagination as MuiPagination } from '@mui/material';

// const Pagination = ({ proceduresPerPage, totalProcedures, currentPage, paginate }) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(totalProcedures / proceduresPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const handlePageChange = (event, value) => {
//     paginate(value);
//     window.scrollTo(0, 0);
//   };

//   return (
//     <nav sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//       <MuiPagination count={pageNumbers.length} page={currentPage} onChange={handlePageChange} />
//     </nav>
//   );
// };

// export default Pagination;

// import React from 'react';
// import { Pagination as MuiPagination } from '@mui/material';

// const Pagination = ({ proceduresPerPage, totalProcedures, currentPage, paginate }) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(totalProcedures / proceduresPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const handlePageChange = (event, value) => {
//     paginate(value);
//     // Get the current component's top position relative to the viewport
//     const componentTop = event.currentTarget.getBoundingClientRect().top + window.scrollY;
//     // Scroll to the top of the current component
//     window.scrollTo(0, componentTop);
//   };

//   return (
//     <nav sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//       <MuiPagination count={pageNumbers.length} page={currentPage} onChange={handlePageChange} />
//     </nav>
//   );
// };

// export default Pagination;
import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ proceduresPerPage, totalProcedures, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProcedures / proceduresPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (event, value) => {
    paginate(value);
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <MuiPagination count={pageNumbers.length} page={currentPage} onChange={handlePageChange} />
    </nav>
  );
};

export default Pagination;