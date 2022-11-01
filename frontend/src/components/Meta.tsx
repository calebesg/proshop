import { Helmet } from 'react-helmet'

interface MetaProps {
  title?: string
  description?: string
  keyword?: string
}

function Meta({ description, keyword, title }: MetaProps) {
  return (
    <Helmet>
      <title>{title ? title : 'Bem vindo ao Proshop!'}</title>
      <meta
        name="description"
        content={
          description
            ? description
            : 'nós vendemos os melhores produtos para você'
        }
      />
      <meta
        name="keyword"
        content={
          keyword
            ? keyword
            : 'eletronicos, comprar eletronicos, eletronicos baratos'
        }
      />
    </Helmet>
  )
}

export default Meta
