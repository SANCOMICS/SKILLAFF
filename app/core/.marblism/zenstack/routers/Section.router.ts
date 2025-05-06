/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.SectionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.createMany(input as any))),

        create: procedure.input($Schema.SectionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.create(input as any))),

        deleteMany: procedure.input($Schema.SectionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.deleteMany(input as any))),

        delete: procedure.input($Schema.SectionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.delete(input as any))),

        findFirst: procedure.input($Schema.SectionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).section.findFirst(input as any))),

        findMany: procedure.input($Schema.SectionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).section.findMany(input as any))),

        findUnique: procedure.input($Schema.SectionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).section.findUnique(input as any))),

        updateMany: procedure.input($Schema.SectionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.updateMany(input as any))),

        update: procedure.input($Schema.SectionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).section.update(input as any))),

        count: procedure.input($Schema.SectionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).section.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.SectionCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SectionCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SectionCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SectionCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.SectionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SectionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SectionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SectionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SectionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SectionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SectionGetPayload<T>, Context>) => Promise<Prisma.SectionGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.SectionDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SectionDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SectionDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SectionDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SectionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SectionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SectionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SectionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SectionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SectionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SectionGetPayload<T>, Context>) => Promise<Prisma.SectionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SectionFindFirstArgs, TData = Prisma.SectionGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.SectionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SectionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SectionFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SectionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SectionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SectionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SectionFindManyArgs, TData = Array<Prisma.SectionGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.SectionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SectionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SectionFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SectionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SectionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SectionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SectionFindUniqueArgs, TData = Prisma.SectionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SectionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SectionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SectionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SectionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SectionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SectionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.SectionUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SectionUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SectionUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SectionUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.SectionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SectionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SectionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SectionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SectionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SectionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SectionGetPayload<T>, Context>) => Promise<Prisma.SectionGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.SectionCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SectionCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.SectionCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.SectionCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.SectionCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.SectionCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.SectionCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SectionCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
