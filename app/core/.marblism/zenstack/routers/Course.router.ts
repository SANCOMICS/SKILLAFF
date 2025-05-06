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

        createMany: procedure.input($Schema.CourseInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.createMany(input as any))),

        create: procedure.input($Schema.CourseInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.create(input as any))),

        deleteMany: procedure.input($Schema.CourseInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.deleteMany(input as any))),

        delete: procedure.input($Schema.CourseInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.delete(input as any))),

        findFirst: procedure.input($Schema.CourseInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).course.findFirst(input as any))),

        findMany: procedure.input($Schema.CourseInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).course.findMany(input as any))),

        findUnique: procedure.input($Schema.CourseInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).course.findUnique(input as any))),

        updateMany: procedure.input($Schema.CourseInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.updateMany(input as any))),

        update: procedure.input($Schema.CourseInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).course.update(input as any))),

        count: procedure.input($Schema.CourseInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).course.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CourseCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CourseCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CourseCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CourseCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CourseCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CourseCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CourseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CourseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CourseCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CourseCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CourseGetPayload<T>, Context>) => Promise<Prisma.CourseGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CourseDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CourseDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CourseDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CourseDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CourseDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CourseDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CourseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CourseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CourseDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CourseDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CourseGetPayload<T>, Context>) => Promise<Prisma.CourseGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CourseFindFirstArgs, TData = Prisma.CourseGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CourseFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CourseGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CourseFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CourseFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CourseGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CourseGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CourseFindManyArgs, TData = Array<Prisma.CourseGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CourseFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CourseGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CourseFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CourseFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CourseGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CourseGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CourseFindUniqueArgs, TData = Prisma.CourseGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CourseFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CourseGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CourseFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CourseFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CourseGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CourseGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CourseUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CourseUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CourseUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CourseUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CourseUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CourseUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CourseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CourseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CourseUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CourseUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CourseGetPayload<T>, Context>) => Promise<Prisma.CourseGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CourseCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CourseCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CourseCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CourseCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CourseCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CourseCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CourseCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CourseCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
