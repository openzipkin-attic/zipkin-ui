export module Zipkin {
    export interface Endpoint {
        serviceName: string;
        ipv4: string;
        port: number;
    }

    export interface Annotation {
        timestamp: any;
        value: string;
        endpoint: Endpoint;
    }

    export interface BinaryAnnotation {
        key: string;
        value: string;
        endpoint: Endpoint;
    }

    export interface Span {
        traceId: string;
        id: string;
        name: string;
        parentId: string;
        timestamp: number;
        duration: number;
        annotations: Annotation[];
        binaryAnnotations: BinaryAnnotation[];
    }

    export type Trace = Span[];

    export type Traces = Trace[]
}
