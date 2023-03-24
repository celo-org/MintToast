export type Scalars = {
    BigDecimal: any,
    BigInt: any,
    Boolean: boolean,
    Bytes: any,
    Float: number,
    ID: string,
    Int: number,
    String: string,
}

export interface Event {
    id: Scalars['ID']
    creationTimestamp: Scalars['BigInt']
    totalSupply: Scalars['BigInt']
    currentSupply: Scalars['BigInt']
    toaster: Scalars['Bytes']
    uri: Scalars['String']
    items: Item[]
    __typename: 'Event'
}

export interface EventBalance {
    id: Scalars['ID']
    balance: Scalars['BigInt']
    __typename: 'EventBalance'
}

export type EventBalance_orderBy = 'id' | 'balance'

export type Event_orderBy = 'id' | 'creationTimestamp' | 'totalSupply' | 'currentSupply' | 'toaster' | 'uri' | 'items'

export interface Item {
    id: Scalars['ID']
    event: Event
    timestamp: Scalars['BigInt']
    owner: User
    __typename: 'Item'
}

export type Item_orderBy = 'id' | 'event' | 'event__id' | 'event__creationTimestamp' | 'event__totalSupply' | 'event__currentSupply' | 'event__toaster' | 'event__uri' | 'timestamp' | 'owner' | 'owner__id'


/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc'

export interface Query {
    user?: User
    users: User[]
    event?: Event
    events: Event[]
    item?: Item
    items: Item[]
    eventBalance?: EventBalance
    eventBalances: EventBalance[]
    /** Access to subgraph metadata */
    _meta?: _Meta_
    __typename: 'Query'
}

export interface Subscription {
    user?: User
    users: User[]
    event?: Event
    events: Event[]
    item?: Item
    items: Item[]
    eventBalance?: EventBalance
    eventBalances: EventBalance[]
    /** Access to subgraph metadata */
    _meta?: _Meta_
    __typename: 'Subscription'
}

export interface User {
    id: Scalars['ID']
    collection: Item[]
    __typename: 'User'
}

export type User_orderBy = 'id' | 'collection'

export interface _Block_ {
    /** The hash of the block */
    hash?: Scalars['Bytes']
    /** The block number */
    number: Scalars['Int']
    /** Integer representation of the timestamp stored in blocks for the chain */
    timestamp?: Scalars['Int']
    __typename: '_Block_'
}


/** The type for the top-level _meta field */
export interface _Meta_ {
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     * 
     */
    block: _Block_
    /** The deployment ID */
    deployment: Scalars['String']
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean']
    __typename: '_Meta_'
}

export type _SubgraphErrorPolicy_ = 'allow' | 'deny'

export interface BlockChangedFilter {number_gte: Scalars['Int']}

export interface Block_height {hash?: (Scalars['Bytes'] | null),number?: (Scalars['Int'] | null),number_gte?: (Scalars['Int'] | null)}

export interface EventGenqlSelection{
    id?: boolean | number
    creationTimestamp?: boolean | number
    totalSupply?: boolean | number
    currentSupply?: boolean | number
    toaster?: boolean | number
    uri?: boolean | number
    items?: (ItemGenqlSelection & { __args?: {skip?: (Scalars['Int'] | null), first?: (Scalars['Int'] | null), orderBy?: (Item_orderBy | null), orderDirection?: (OrderDirection | null), where?: (Item_filter | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EventBalanceGenqlSelection{
    id?: boolean | number
    balance?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EventBalance_filter {id?: (Scalars['ID'] | null),id_not?: (Scalars['ID'] | null),id_gt?: (Scalars['ID'] | null),id_lt?: (Scalars['ID'] | null),id_gte?: (Scalars['ID'] | null),id_lte?: (Scalars['ID'] | null),id_in?: (Scalars['ID'][] | null),id_not_in?: (Scalars['ID'][] | null),balance?: (Scalars['BigInt'] | null),balance_not?: (Scalars['BigInt'] | null),balance_gt?: (Scalars['BigInt'] | null),balance_lt?: (Scalars['BigInt'] | null),balance_gte?: (Scalars['BigInt'] | null),balance_lte?: (Scalars['BigInt'] | null),balance_in?: (Scalars['BigInt'][] | null),balance_not_in?: (Scalars['BigInt'][] | null),
/** Filter for the block changed event. */
_change_block?: (BlockChangedFilter | null),and?: ((EventBalance_filter | null)[] | null),or?: ((EventBalance_filter | null)[] | null)}

export interface Event_filter {id?: (Scalars['ID'] | null),id_not?: (Scalars['ID'] | null),id_gt?: (Scalars['ID'] | null),id_lt?: (Scalars['ID'] | null),id_gte?: (Scalars['ID'] | null),id_lte?: (Scalars['ID'] | null),id_in?: (Scalars['ID'][] | null),id_not_in?: (Scalars['ID'][] | null),creationTimestamp?: (Scalars['BigInt'] | null),creationTimestamp_not?: (Scalars['BigInt'] | null),creationTimestamp_gt?: (Scalars['BigInt'] | null),creationTimestamp_lt?: (Scalars['BigInt'] | null),creationTimestamp_gte?: (Scalars['BigInt'] | null),creationTimestamp_lte?: (Scalars['BigInt'] | null),creationTimestamp_in?: (Scalars['BigInt'][] | null),creationTimestamp_not_in?: (Scalars['BigInt'][] | null),totalSupply?: (Scalars['BigInt'] | null),totalSupply_not?: (Scalars['BigInt'] | null),totalSupply_gt?: (Scalars['BigInt'] | null),totalSupply_lt?: (Scalars['BigInt'] | null),totalSupply_gte?: (Scalars['BigInt'] | null),totalSupply_lte?: (Scalars['BigInt'] | null),totalSupply_in?: (Scalars['BigInt'][] | null),totalSupply_not_in?: (Scalars['BigInt'][] | null),currentSupply?: (Scalars['BigInt'] | null),currentSupply_not?: (Scalars['BigInt'] | null),currentSupply_gt?: (Scalars['BigInt'] | null),currentSupply_lt?: (Scalars['BigInt'] | null),currentSupply_gte?: (Scalars['BigInt'] | null),currentSupply_lte?: (Scalars['BigInt'] | null),currentSupply_in?: (Scalars['BigInt'][] | null),currentSupply_not_in?: (Scalars['BigInt'][] | null),toaster?: (Scalars['Bytes'] | null),toaster_not?: (Scalars['Bytes'] | null),toaster_gt?: (Scalars['Bytes'] | null),toaster_lt?: (Scalars['Bytes'] | null),toaster_gte?: (Scalars['Bytes'] | null),toaster_lte?: (Scalars['Bytes'] | null),toaster_in?: (Scalars['Bytes'][] | null),toaster_not_in?: (Scalars['Bytes'][] | null),toaster_contains?: (Scalars['Bytes'] | null),toaster_not_contains?: (Scalars['Bytes'] | null),uri?: (Scalars['String'] | null),uri_not?: (Scalars['String'] | null),uri_gt?: (Scalars['String'] | null),uri_lt?: (Scalars['String'] | null),uri_gte?: (Scalars['String'] | null),uri_lte?: (Scalars['String'] | null),uri_in?: (Scalars['String'][] | null),uri_not_in?: (Scalars['String'][] | null),uri_contains?: (Scalars['String'] | null),uri_contains_nocase?: (Scalars['String'] | null),uri_not_contains?: (Scalars['String'] | null),uri_not_contains_nocase?: (Scalars['String'] | null),uri_starts_with?: (Scalars['String'] | null),uri_starts_with_nocase?: (Scalars['String'] | null),uri_not_starts_with?: (Scalars['String'] | null),uri_not_starts_with_nocase?: (Scalars['String'] | null),uri_ends_with?: (Scalars['String'] | null),uri_ends_with_nocase?: (Scalars['String'] | null),uri_not_ends_with?: (Scalars['String'] | null),uri_not_ends_with_nocase?: (Scalars['String'] | null),items_?: (Item_filter | null),
/** Filter for the block changed event. */
_change_block?: (BlockChangedFilter | null),and?: ((Event_filter | null)[] | null),or?: ((Event_filter | null)[] | null)}

export interface ItemGenqlSelection{
    id?: boolean | number
    event?: EventGenqlSelection
    timestamp?: boolean | number
    owner?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface Item_filter {id?: (Scalars['ID'] | null),id_not?: (Scalars['ID'] | null),id_gt?: (Scalars['ID'] | null),id_lt?: (Scalars['ID'] | null),id_gte?: (Scalars['ID'] | null),id_lte?: (Scalars['ID'] | null),id_in?: (Scalars['ID'][] | null),id_not_in?: (Scalars['ID'][] | null),event?: (Scalars['String'] | null),event_not?: (Scalars['String'] | null),event_gt?: (Scalars['String'] | null),event_lt?: (Scalars['String'] | null),event_gte?: (Scalars['String'] | null),event_lte?: (Scalars['String'] | null),event_in?: (Scalars['String'][] | null),event_not_in?: (Scalars['String'][] | null),event_contains?: (Scalars['String'] | null),event_contains_nocase?: (Scalars['String'] | null),event_not_contains?: (Scalars['String'] | null),event_not_contains_nocase?: (Scalars['String'] | null),event_starts_with?: (Scalars['String'] | null),event_starts_with_nocase?: (Scalars['String'] | null),event_not_starts_with?: (Scalars['String'] | null),event_not_starts_with_nocase?: (Scalars['String'] | null),event_ends_with?: (Scalars['String'] | null),event_ends_with_nocase?: (Scalars['String'] | null),event_not_ends_with?: (Scalars['String'] | null),event_not_ends_with_nocase?: (Scalars['String'] | null),event_?: (Event_filter | null),timestamp?: (Scalars['BigInt'] | null),timestamp_not?: (Scalars['BigInt'] | null),timestamp_gt?: (Scalars['BigInt'] | null),timestamp_lt?: (Scalars['BigInt'] | null),timestamp_gte?: (Scalars['BigInt'] | null),timestamp_lte?: (Scalars['BigInt'] | null),timestamp_in?: (Scalars['BigInt'][] | null),timestamp_not_in?: (Scalars['BigInt'][] | null),owner?: (Scalars['String'] | null),owner_not?: (Scalars['String'] | null),owner_gt?: (Scalars['String'] | null),owner_lt?: (Scalars['String'] | null),owner_gte?: (Scalars['String'] | null),owner_lte?: (Scalars['String'] | null),owner_in?: (Scalars['String'][] | null),owner_not_in?: (Scalars['String'][] | null),owner_contains?: (Scalars['String'] | null),owner_contains_nocase?: (Scalars['String'] | null),owner_not_contains?: (Scalars['String'] | null),owner_not_contains_nocase?: (Scalars['String'] | null),owner_starts_with?: (Scalars['String'] | null),owner_starts_with_nocase?: (Scalars['String'] | null),owner_not_starts_with?: (Scalars['String'] | null),owner_not_starts_with_nocase?: (Scalars['String'] | null),owner_ends_with?: (Scalars['String'] | null),owner_ends_with_nocase?: (Scalars['String'] | null),owner_not_ends_with?: (Scalars['String'] | null),owner_not_ends_with_nocase?: (Scalars['String'] | null),owner_?: (User_filter | null),
/** Filter for the block changed event. */
_change_block?: (BlockChangedFilter | null),and?: ((Item_filter | null)[] | null),or?: ((Item_filter | null)[] | null)}

export interface QueryGenqlSelection{
    user?: (UserGenqlSelection & { __args: {id: Scalars['ID'], 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    users?: (UserGenqlSelection & { __args: {skip?: (Scalars['Int'] | null), first?: (Scalars['Int'] | null), orderBy?: (User_orderBy | null), orderDirection?: (OrderDirection | null), where?: (User_filter | null), 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    event?: (EventGenqlSelection & { __args: {id: Scalars['ID'], 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    events?: (EventGenqlSelection & { __args: {skip?: (Scalars['Int'] | null), first?: (Scalars['Int'] | null), orderBy?: (Event_orderBy | null), orderDirection?: (OrderDirection | null), where?: (Event_filter | null), 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    item?: (ItemGenqlSelection & { __args: {id: Scalars['ID'], 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    items?: (ItemGenqlSelection & { __args: {skip?: (Scalars['Int'] | null), first?: (Scalars['Int'] | null), orderBy?: (Item_orderBy | null), orderDirection?: (OrderDirection | null), where?: (Item_filter | null), 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    eventBalance?: (EventBalanceGenqlSelection & { __args: {id: Scalars['ID'], 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    eventBalances?: (EventBalanceGenqlSelection & { __args: {skip?: (Scalars['Int'] | null), first?: (Scalars['Int'] | null), orderBy?: (EventBalance_orderBy | null), orderDirection?: (OrderDirection | null), where?: (EventBalance_filter | null), 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    /** Access to subgraph metadata */
    _meta?: (_Meta_GenqlSelection & { __args?: {block?: (Block_height | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SubscriptionGenqlSelection{
    user?: (UserGenqlSelection & { __args: {id: Scalars['ID'], 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    users?: (UserGenqlSelection & { __args: {skip?: (Scalars['Int'] | null), first?: (Scalars['Int'] | null), orderBy?: (User_orderBy | null), orderDirection?: (OrderDirection | null), where?: (User_filter | null), 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    event?: (EventGenqlSelection & { __args: {id: Scalars['ID'], 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    events?: (EventGenqlSelection & { __args: {skip?: (Scalars['Int'] | null), first?: (Scalars['Int'] | null), orderBy?: (Event_orderBy | null), orderDirection?: (OrderDirection | null), where?: (Event_filter | null), 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    item?: (ItemGenqlSelection & { __args: {id: Scalars['ID'], 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    items?: (ItemGenqlSelection & { __args: {skip?: (Scalars['Int'] | null), first?: (Scalars['Int'] | null), orderBy?: (Item_orderBy | null), orderDirection?: (OrderDirection | null), where?: (Item_filter | null), 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    eventBalance?: (EventBalanceGenqlSelection & { __args: {id: Scalars['ID'], 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    eventBalances?: (EventBalanceGenqlSelection & { __args: {skip?: (Scalars['Int'] | null), first?: (Scalars['Int'] | null), orderBy?: (EventBalance_orderBy | null), orderDirection?: (OrderDirection | null), where?: (EventBalance_filter | null), 
    /** The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted. */
    block?: (Block_height | null), 
    /** Set to `allow` to receive data even if the subgraph has skipped over errors while syncing. */
    subgraphError: _SubgraphErrorPolicy_} })
    /** Access to subgraph metadata */
    _meta?: (_Meta_GenqlSelection & { __args?: {block?: (Block_height | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserGenqlSelection{
    id?: boolean | number
    collection?: (ItemGenqlSelection & { __args?: {skip?: (Scalars['Int'] | null), first?: (Scalars['Int'] | null), orderBy?: (Item_orderBy | null), orderDirection?: (OrderDirection | null), where?: (Item_filter | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface User_filter {id?: (Scalars['ID'] | null),id_not?: (Scalars['ID'] | null),id_gt?: (Scalars['ID'] | null),id_lt?: (Scalars['ID'] | null),id_gte?: (Scalars['ID'] | null),id_lte?: (Scalars['ID'] | null),id_in?: (Scalars['ID'][] | null),id_not_in?: (Scalars['ID'][] | null),collection_?: (Item_filter | null),
/** Filter for the block changed event. */
_change_block?: (BlockChangedFilter | null),and?: ((User_filter | null)[] | null),or?: ((User_filter | null)[] | null)}

export interface _Block_GenqlSelection{
    /** The hash of the block */
    hash?: boolean | number
    /** The block number */
    number?: boolean | number
    /** Integer representation of the timestamp stored in blocks for the chain */
    timestamp?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The type for the top-level _meta field */
export interface _Meta_GenqlSelection{
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     * 
     */
    block?: _Block_GenqlSelection
    /** The deployment ID */
    deployment?: boolean | number
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Event_possibleTypes: string[] = ['Event']
    export const isEvent = (obj?: { __typename?: any } | null): obj is Event => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEvent"')
      return Event_possibleTypes.includes(obj.__typename)
    }
    


    const EventBalance_possibleTypes: string[] = ['EventBalance']
    export const isEventBalance = (obj?: { __typename?: any } | null): obj is EventBalance => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEventBalance"')
      return EventBalance_possibleTypes.includes(obj.__typename)
    }
    


    const Item_possibleTypes: string[] = ['Item']
    export const isItem = (obj?: { __typename?: any } | null): obj is Item => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isItem"')
      return Item_possibleTypes.includes(obj.__typename)
    }
    


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Subscription_possibleTypes: string[] = ['Subscription']
    export const isSubscription = (obj?: { __typename?: any } | null): obj is Subscription => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSubscription"')
      return Subscription_possibleTypes.includes(obj.__typename)
    }
    


    const User_possibleTypes: string[] = ['User']
    export const isUser = (obj?: { __typename?: any } | null): obj is User => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
      return User_possibleTypes.includes(obj.__typename)
    }
    


    const _Block__possibleTypes: string[] = ['_Block_']
    export const is_Block_ = (obj?: { __typename?: any } | null): obj is _Block_ => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_Block_"')
      return _Block__possibleTypes.includes(obj.__typename)
    }
    


    const _Meta__possibleTypes: string[] = ['_Meta_']
    export const is_Meta_ = (obj?: { __typename?: any } | null): obj is _Meta_ => {
      if (!obj?.__typename) throw new Error('__typename is missing in "is_Meta_"')
      return _Meta__possibleTypes.includes(obj.__typename)
    }
    

export const enumEventBalanceOrderBy = {
   id: 'id' as const,
   balance: 'balance' as const
}

export const enumEventOrderBy = {
   id: 'id' as const,
   creationTimestamp: 'creationTimestamp' as const,
   totalSupply: 'totalSupply' as const,
   currentSupply: 'currentSupply' as const,
   toaster: 'toaster' as const,
   uri: 'uri' as const,
   items: 'items' as const
}

export const enumItemOrderBy = {
   id: 'id' as const,
   event: 'event' as const,
   event__id: 'event__id' as const,
   event__creationTimestamp: 'event__creationTimestamp' as const,
   event__totalSupply: 'event__totalSupply' as const,
   event__currentSupply: 'event__currentSupply' as const,
   event__toaster: 'event__toaster' as const,
   event__uri: 'event__uri' as const,
   timestamp: 'timestamp' as const,
   owner: 'owner' as const,
   owner__id: 'owner__id' as const
}

export const enumOrderDirection = {
   asc: 'asc' as const,
   desc: 'desc' as const
}

export const enumUserOrderBy = {
   id: 'id' as const,
   collection: 'collection' as const
}

export const enumSubgraphErrorPolicy = {
   allow: 'allow' as const,
   deny: 'deny' as const
}
