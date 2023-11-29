import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { ApolloProvider, gql } from "@apollo/client";
import createApolloClient from "../createApolloClient";
import type { PartModel } from "@/model/part";
import Part from "@/components/Part";
import Feature from "@/components/Feature";
import { Fragment } from "react";
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps = (async (context) => {
  const client = createApolloClient();
  const { data } = await client.query<{ parts: PartModel[] }>({
    query: gql`
      query Parts {
        parts {
          id
          name
          features {
            id
            name
            controls {
              id
              name
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      parts: data.parts,
    },
  };
}) satisfies GetServerSideProps<{
  parts: PartModel[]
}>

export default function Home({ parts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        {parts.map(part => (
          <Fragment key={part.id}>
            <Part  {...part} />
            {part.features.map(feature => (
              <Feature key={feature.id} feature={feature} partId={part.id} />
            ))}
          </Fragment>
        ))}
      </main>
    </ApolloProvider>
  )
}


