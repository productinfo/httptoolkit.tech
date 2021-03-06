import React from "react";
import Helmet from 'react-helmet';
import moment from 'moment';
import Img from 'gatsby-image';

import { siteMetadata } from '../../gatsby-config.js';
import { styled, media, css } from '../styles';
import FullWidthSection from '../components/full-width-section';
import { Hr } from '../components/hr';
import { BlogSubscribe } from '../components/blog-subscribe';

const BlogPostContainer = FullWidthSection.extend`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
    padding-bottom: 60px;
`;

const PublishDate = styled.p`
  font-style: italic;
  text-align: right;
`;

const BlogPost = styled.article`
  background-color: ${p => p.theme.mainBackground};

  h1 {
    ${p => p.theme.fontSizeBiggerHeading}
    font-weight: bold;
    color: ${p => p.theme.mainColor};
    margin-top: 60px;
  }

  h2 {
    ${p => p.theme.fontSizeSubheading}
    color: ${p => p.theme.popColor};

    margin: 60px 0 30px;

    &:first-child {
      margin: 10px 0 60px;
      font-style: italic;
    }

    &:not(:first-child) {
      font-weight: bold;
    }
  }

  h3 {
    font-weight: bold;
    ${p => p.theme.fontSizeText}
    color: ${p => p.theme.mainColor};
    line-height: 1.45;
  }

  p, ul {
    ${p => p.theme.fontSizeText}
    color: ${p => p.theme.mainColor};
    line-height: 1.45;
    margin-bottom: 30px;
  }

  ul {
    list-style-type: circle;
    margin-left: 25px;
  }

  li {
    margin-bottom: 10px;

    & > p:only-child {
      margin-bottom: 0;
    }
  }

  code {
    font-family: mono;
    font-weight: bold;
  }
`;

const CoverImg = styled(Img)`
  object-fit: cover;
  width: 100vw;
  max-height: 60vh;
  margin: 0 calc(-1 * (100vw - 100%) / 2);
`;

export default ({ data }) => {
  const post = data.markdownRemark;
  const publishDate = moment(post.frontmatter.date, 'YYYY-MM-DDTHH:mm');

  return (
    <BlogPostContainer width='780px'>
      <Helmet>
        <title>{siteMetadata.name} | {post.frontmatter.title}</title>
        <meta name="description" content={post.excerpt} />

        <meta property="og:title"       content={post.frontmatter.title} />
        <meta property="og:description" content={post.excerpt} />

        <meta name="twitter:title"       content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Helmet>

      <BlogPost>
        <CoverImg sizes={post.frontmatter.cover_image.childImageSharp.sizes} />
        <h1>{post.frontmatter.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <PublishDate title={publishDate.format('MMM Do YYYY')}>Published { publishDate.fromNow() }</PublishDate>
      </BlogPost>

      <Hr/>

      <BlogSubscribe />
    </BlogPostContainer>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        cover_image {
          childImageSharp{
            sizes(maxWidth: 2560) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;