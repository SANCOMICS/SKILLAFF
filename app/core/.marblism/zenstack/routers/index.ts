/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createSubscriptionRouter from "./Subscription.router";
import createCourseRouter from "./Course.router";
import createSectionRouter from "./Section.router";
import createVideoRouter from "./Video.router";
import createWalletRouter from "./Wallet.router";
import createReferralRouter from "./Referral.router";
import createTransactionRouter from "./Transaction.router";
import createSocialAccountRouter from "./SocialAccount.router";
import createSkillFeedVideoRouter from "./SkillFeedVideo.router";
import createUserCourseRouter from "./UserCourse.router";
import createPremiumLinkRouter from "./PremiumLink.router";
import createAffiliateLinkRouter from "./AffiliateLink.router";
import createPayoutSettingsRouter from "./PayoutSettings.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as SubscriptionClientType } from "./Subscription.router";
import { ClientType as CourseClientType } from "./Course.router";
import { ClientType as SectionClientType } from "./Section.router";
import { ClientType as VideoClientType } from "./Video.router";
import { ClientType as WalletClientType } from "./Wallet.router";
import { ClientType as ReferralClientType } from "./Referral.router";
import { ClientType as TransactionClientType } from "./Transaction.router";
import { ClientType as SocialAccountClientType } from "./SocialAccount.router";
import { ClientType as SkillFeedVideoClientType } from "./SkillFeedVideo.router";
import { ClientType as UserCourseClientType } from "./UserCourse.router";
import { ClientType as PremiumLinkClientType } from "./PremiumLink.router";
import { ClientType as AffiliateLinkClientType } from "./AffiliateLink.router";
import { ClientType as PayoutSettingsClientType } from "./PayoutSettings.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        subscription: createSubscriptionRouter(router, procedure),
        course: createCourseRouter(router, procedure),
        section: createSectionRouter(router, procedure),
        video: createVideoRouter(router, procedure),
        wallet: createWalletRouter(router, procedure),
        referral: createReferralRouter(router, procedure),
        transaction: createTransactionRouter(router, procedure),
        socialAccount: createSocialAccountRouter(router, procedure),
        skillFeedVideo: createSkillFeedVideoRouter(router, procedure),
        userCourse: createUserCourseRouter(router, procedure),
        premiumLink: createPremiumLinkRouter(router, procedure),
        affiliateLink: createAffiliateLinkRouter(router, procedure),
        payoutSettings: createPayoutSettingsRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    subscription: SubscriptionClientType<AppRouter>;
    course: CourseClientType<AppRouter>;
    section: SectionClientType<AppRouter>;
    video: VideoClientType<AppRouter>;
    wallet: WalletClientType<AppRouter>;
    referral: ReferralClientType<AppRouter>;
    transaction: TransactionClientType<AppRouter>;
    socialAccount: SocialAccountClientType<AppRouter>;
    skillFeedVideo: SkillFeedVideoClientType<AppRouter>;
    userCourse: UserCourseClientType<AppRouter>;
    premiumLink: PremiumLinkClientType<AppRouter>;
    affiliateLink: AffiliateLinkClientType<AppRouter>;
    payoutSettings: PayoutSettingsClientType<AppRouter>;
}
