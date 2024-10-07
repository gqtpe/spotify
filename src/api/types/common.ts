



interface External_Urls { [key: string]: string }

interface Restrictions {
    reason: 'market' | 'product' | 'explicit'
}
interface LinkedFrom { external_urls: External_Urls; href: string; id: string; type: string; uri: string }

export interface Image {
    height: number;
    url: string;
    width: number;
}

type Images = Image[];

interface Copyright {
    text: string
    type: string
}
type Copyrights = Copyright[]

type ResponsePaginationUrl = null | string
type ResponseType<T> = {
    href: string
    items: T
    limit: number
    next: ResponsePaginationUrl
    offset: number
    previous: ResponsePaginationUrl
    total: number
}

export type {
    External_Urls,
    Restrictions,
    LinkedFrom,
    Images,
    Copyrights,
    ResponseType
}