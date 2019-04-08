import {
    IResolvers,
    ItemsDocument,
    ItemsQuery,
    SelectedCountFragment,
    SelectedCountFragmentDoc
} from "./graphql"

export const defaults = {}

export const resolvers: IResolvers = {
    ItemType: {
        SelectedCount: ({Id}, _, {cache}) => {
            const {SelectedCount} = cache.readFragment<SelectedCountFragment>({
                id: Id,
                fragment: SelectedCountFragmentDoc
            }) || {SelectedCount: 0}

            return SelectedCount
        }
    },
    Mutation: {
        ResetItemSelectedCounts: (_, __, {cache}) => {
            const items = cache.readQuery<ItemsQuery>({
                query: ItemsDocument
            })
            if (!items) {
                return true
            }
            for (const {Id} of items.Items) {
                cache.writeFragment<SelectedCountFragment>({
                    id: Id,
                    fragment: SelectedCountFragmentDoc,
                    data: {
                        __typename: "ItemType",
                        SelectedCount: 0
                    }
                })
            }
            return true
        },

        UpdateItemSelectedCount: (_, {Id, SelectedCount}, {cache}) => {
            cache.writeFragment<SelectedCountFragment>({
                id: Id,
                fragment: SelectedCountFragmentDoc,
                data: {
                    __typename: "ItemType",
                    SelectedCount
                }
            })

            return SelectedCount
        }
    }
}
