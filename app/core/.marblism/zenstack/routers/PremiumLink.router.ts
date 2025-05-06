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

        createMany: procedure.input($Schema.PremiumLinkInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.createMany(input as any))),

        create: procedure.input($Schema.PremiumLinkInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.create(input as any))),

        deleteMany: procedure.input($Schema.PremiumLinkInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.deleteMany(input as any))),

        delete: procedure.input($Schema.PremiumLinkInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.delete(input as any))),

        findFirst: procedure.input($Schema.PremiumLinkInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).premiumLink.findFirst(input as any))),

        findMany: procedure.input($Schema.PremiumLinkInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).premiumLink.findMany(input as any))),

        findUnique: procedure.input($Schema.PremiumLinkInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).premiumLink.findUnique(input as any))),

        updateMany: procedure.input($Schema.PremiumLinkInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.updateMany(input as any))),

        update: procedure.input($Schema.PremiumLinkInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).premiumLink.update(input as any))),

        count: procedure.input($Schema.PremiumLinkInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).premiumLink.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PremiumLinkCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PremiumLinkCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PremiumLinkCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PremiumLinkCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PremiumLinkCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PremiumLinkCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PremiumLinkGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PremiumLinkGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PremiumLinkCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PremiumLinkCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PremiumLinkGetPayload<T>, Context>) => Promise<Prisma.PremiumLinkGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PremiumLinkDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PremiumLinkDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PremiumLinkDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PremiumLinkDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PremiumLinkDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PremiumLinkDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PremiumLinkGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PremiumLinkGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PremiumLinkDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PremiumLinkDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PremiumLinkGetPayload<T>, Context>) => Promise<Prisma.PremiumLinkGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PremiumLinkFindFirstArgs, TData = Prisma.PremiumLinkGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.PremiumLinkFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PremiumLinkGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PremiumLinkFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PremiumLinkFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PremiumLinkGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PremiumLinkGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PremiumLinkFindManyArgs, TData = Array<Prisma.PremiumLinkGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.PremiumLinkFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PremiumLinkGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PremiumLinkFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PremiumLinkFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PremiumLinkGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PremiumLinkGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PremiumLinkFindUniqueArgs, TData = Prisma.PremiumLinkGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PremiumLinkFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PremiumLinkGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PremiumLinkFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PremiumLinkFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PremiumLinkGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PremiumLinkGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PremiumLinkUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PremiumLinkUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PremiumLinkUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PremiumLinkUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PremiumLinkUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PremiumLinkUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PremiumLinkGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PremiumLinkGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PremiumLinkUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PremiumLinkUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PremiumLinkGetPayload<T>, Context>) => Promise<Prisma.PremiumLinkGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.PremiumLinkCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PremiumLinkCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.PremiumLinkCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.PremiumLinkCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.PremiumLinkCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.PremiumLinkCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.PremiumLinkCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PremiumLinkCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
