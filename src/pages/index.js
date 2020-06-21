import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"


const Title = styled.h1`
  display: inline-block;
 ` 

const BlogTitle = styled.h3`
  margin-bottom: 20px;
 ` 


const BlogLink = styled(Link)`
  text-decoration: none;
  color: blue;
`

export default ({ data }) => {
  console.log(data);
  return(
  <Layout>
    <Title title="Home" />
    <div>
      <Title>Herman's thoughts</Title>
      <h4>{ data.allMarkdownRemark.totalCount }</h4>
      {data.allMarkdownRemark.edges.map(({node}) => (
        <div key={node.id}>
          <BlogLink to={node.fields.slug }>
            <BlogTitle>
              <span>{ node.frontmatter.title } - { node.frontmatter.date}</span>
            </BlogTitle>
          </BlogLink>
          <p>{ node.excerpt }</p>
        </div>
        ))
      }
    </div>   
  </Layout>
)}



export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
