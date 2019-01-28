import {ApolloCache} from "apollo-cache"
import gql from "graphql-tag"

export const defaults = {
    currentTab: 0
}

export const resolvers = {
    ItemType: {
        selectedCount: ({id}, _, {cache}: {cache: ApolloCache<any>}) => {
            const count =
                cache.readFragment({
                    id,
                    fragment: gql`
                        fragment SelectedCount on ItemType {
                            selectedCount @client
                        }
                    `
                }) || 0

            return count
        }
    },
    Mutation: {
        resetItemSelectedCounts: (
            _,
            __,
            {cache}: {cache: ApolloCache<any>}
        ) => {
            const {items} = cache.readQuery({
                query: gql`
                    query GetAllItems {
                        items {
                            id
                        }
                    }
                `
            })
            for (const {id} of items) {
                cache.writeFragment({
                    id,
                    fragment: gql`
                        fragment SelectedCount on ItemType {
                            selectedCount @client
                        }
                    `,
                    data: {
                        __typename: "ItemType",
                        selectedCount: 0
                    }
                })
            }
            return true
        },
        setCurrentTab: (_, {tab}, {cache}: {cache: ApolloCache<any>}) => {
            cache.writeQuery({
                query: gql`
                    query GetCurrentTab {
                        currentTab @client
                    }
                `,
                data: {
                    __typename: "CurrentTab",
                    currentTab: tab
                }
            })
            return tab
        },
        updateItemSelectedCount: (
            _,
            {id, selectedCount},
            {cache}: {cache: ApolloCache<any>}
        ) => {
            cache.writeFragment({
                id,
                fragment: gql`
                    fragment SelectedCount on ItemType {
                        selectedCount @client
                    }
                `,
                data: {
                    __typename: "ItemType",
                    selectedCount
                }
            })

            return selectedCount
        }
    }
}
