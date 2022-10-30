import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

interface PaginateProps {
  page: number
  totalPage: number
  isAdmin?: boolean
  keyword?: string
}

function Paginate({
  page,
  totalPage,
  isAdmin = false,
  keyword = '',
}: PaginateProps) {
  if (totalPage === 1) return null

  return (
    <Pagination>
      {[...Array(totalPage).keys()].map(pageNumber => (
        <LinkContainer
          key={pageNumber + 1}
          to={
            isAdmin
              ? `/admin/produto/${pageNumber + 1}`
              : keyword
              ? `/busca/${keyword}/page/${pageNumber + 1}`
              : `/page/${pageNumber + 1}`
          }
        >
          <Pagination.Item active={pageNumber + 1 === page}>
            {pageNumber + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate
