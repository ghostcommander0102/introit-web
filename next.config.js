const path = require("path");
const webpack = require("webpack");
const withPWA = require("next-pwa");
const baseUrl = process.env.NEXT_PUBLIC_API;
module.exports = withPWA({
	reactStrictMode: true,
	images: {
		domains: ["localhost", "lh3.googleusercontent.com", "imagedelivery.net"],
		minimumCacheTTL: 60,
		disableStaticImages: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	pwa: {
		dest: "public",
		disable: process.env.NEXT_PUBLIC_NODENV !== "production",
	},
	async rewrites() {
		return [
			//***************************
			//Start Auth
			//***************************
			{
				source: "/auth/current",
				destination: `${baseUrl}/auth/current`,
			},
			{
				source: "/auth/login/local",
				destination: `${baseUrl}/auth/login/local`,
			},
			{
				source: "/auth/login/2fa",
				destination: `${baseUrl}/auth/login/2fa`,
			},
			{
				source: "/auth/register",
				destination: `${baseUrl}/auth/register`,
			},
			{
				source: "/auth/logout",
				destination: `${baseUrl}/auth/logout`,
			},
			{
				source: "/auth/password/forgot",
				destination: `${baseUrl}/auth/password/forgot`,
			},
			{
				source: "/auth/password/reset",
				destination: `${baseUrl}/auth/password/reset`,
			},
			{
				source: "/auth/password/change",
				destination: `${baseUrl}/auth/password/change`,
			},
			{
				source: "/auth/activation/:token*",
				destination: `${baseUrl}/auth/activation/:token*`,
			},

			//***************************
			//End Auth
			//***************************

			//***************************
			//Start Settings
			//***************************
			{
				source: "/user-settings/user/edit/theme",
				destination: `${baseUrl}/user-settings/user/edit/theme`,
			},
			{
				source: "/user-settings/user/edit/timezone",
				destination: `${baseUrl}/user-settings/user/edit/timezone`,
			},
			{
				source: "/user-settings/user/edit/currency",
				destination: `${baseUrl}/user-settings/user/edit/currency`,
			},
			{
				source: "/user-settings/user/edit/language",
				destination: `${baseUrl}/user-settings/user/edit/language`,
			},
			{
				source: "/user-settings/user/edit/gridview",
				destination: `${baseUrl}/user-settings/user/edit/gridview`,
			},
			{
				source: "/global-settings/basic-info/view/academic-levels",
				destination: `${baseUrl}/global-settings/basic-info/view/academic-levels`,
			},
			{
				source: "/global-settings/basic-info/view/academic-levels/all",
				destination: `${baseUrl}/global-settings/basic-info/view/academic-levels/all`,
			},
			{
				source: "/global-settings/basic-info/view/academic-level/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/academic-level/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/academic-level",
				destination: `${baseUrl}/global-settings/basic-info/create/academic-level`,
			},
			{
				source: "/global-settings/basic-info/edit/academic-level/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/academic-level/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/academic-level/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/academic-level/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/industries",
				destination: `${baseUrl}/global-settings/basic-info/view/industries`,
			},
			{
				source: "/global-settings/basic-info/view/industries/all",
				destination: `${baseUrl}/global-settings/basic-info/view/industries/all`,
			},
			{
				source: "/global-settings/basic-info/view/industry/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/industry/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/industry",
				destination: `${baseUrl}/global-settings/basic-info/create/industry`,
			},
			{
				source: "/global-settings/basic-info/edit/industry/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/industry/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/industry/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/industry/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/nationalities",
				destination: `${baseUrl}/global-settings/basic-info/view/nationalities`,
			},
			{
				source: "/global-settings/basic-info/view/nationalities/all",
				destination: `${baseUrl}/global-settings/basic-info/view/nationalities/all`,
			},
			{
				source: "/global-settings/basic-info/view/nationality/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/nationality/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/nationality",
				destination: `${baseUrl}/global-settings/basic-info/create/nationality`,
			},
			{
				source: "/global-settings/basic-info/edit/nationality/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/nationality/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/nationality/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/nationality/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/countries",
				destination: `${baseUrl}/global-settings/basic-info/view/countries`,
			},
			{
				source: "/global-settings/basic-info/view/countries/all",
				destination: `${baseUrl}/global-settings/basic-info/view/countries/all`,
			},
			{
				source: "/global-settings/basic-info/view/country/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/country/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/country",
				destination: `${baseUrl}/global-settings/basic-info/create/country`,
			},
			{
				source: "/global-settings/basic-info/edit/country/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/country/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/country/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/country/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/currencies",
				destination: `${baseUrl}/global-settings/basic-info/view/currencies`,
			},
			{
				source: "/global-settings/basic-info/view/currencies/all",
				destination: `${baseUrl}/global-settings/basic-info/view/currencies/all`,
			},
			{
				source: "/global-settings/basic-info/view/currency/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/currency/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/currency",
				destination: `${baseUrl}/global-settings/basic-info/create/currency`,
			},
			{
				source: "/global-settings/basic-info/edit/currency/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/currency/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/currency/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/currency/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/security-questions",
				destination: `${baseUrl}/global-settings/basic-info/view/security-questions`,
			},
			{
				source: "/global-settings/basic-info/view/security-questions/all",
				destination: `${baseUrl}/global-settings/basic-info/view/security-questions/all`,
			},
			{
				source: "/global-settings/basic-info/view/security-question/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/security-question/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/security-question",
				destination: `${baseUrl}/global-settings/basic-info/create/security-question`,
			},
			{
				source: "/global-settings/basic-info/edit/security-question/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/security-question/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/security-question/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/security-question/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/socials",
				destination: `${baseUrl}/global-settings/basic-info/view/socials`,
			},
			{
				source: "/global-settings/basic-info/view/domination-levels",
				destination: `${baseUrl}/global-settings/basic-info/view/domination-levels`,
			},
			{
				source: "/global-settings/basic-info/view/domination-levels/all",
				destination: `${baseUrl}/global-settings/basic-info/view/domination-levels/all`,
			},
			{
				source: "/global-settings/basic-info/view/domination-level/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/domination-level/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/domination-level",
				destination: `${baseUrl}/global-settings/basic-info/create/domination-level`,
			},
			{
				source: "/global-settings/basic-info/edit/domination-level/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/domination-level/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/domination-level/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/domination-level/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/language-certificates",
				destination: `${baseUrl}/global-settings/basic-info/view/language-certificates`,
			},
			{
				source: "/global-settings/basic-info/view/language-certificates/all",
				destination: `${baseUrl}/global-settings/basic-info/view/language-certificates/all`,
			},
			{
				source: "/global-settings/basic-info/view/language-certificate/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/language-certificate/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/language-certificate",
				destination: `${baseUrl}/global-settings/basic-info/create/language-certificate`,
			},
			{
				source: "/global-settings/basic-info/edit/language-certificate/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/language-certificate/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/language-certificate/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/language-certificate/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/language-levels",
				destination: `${baseUrl}/global-settings/basic-info/view/language-levels`,
			},
			{
				source: "/global-settings/basic-info/view/language-levels/all",
				destination: `${baseUrl}/global-settings/basic-info/view/language-levels/all`,
			},
			{
				source: "/global-settings/basic-info/view/language-level/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/language-level/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/language-level",
				destination: `${baseUrl}/global-settings/basic-info/create/language-level`,
			},
			{
				source: "/global-settings/basic-info/edit/language-level/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/language-level/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/language-level/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/language-level/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/languages",
				destination: `${baseUrl}/global-settings/basic-info/view/languages`,
			},
			{
				source: "/global-settings/basic-info/view/languages/all",
				destination: `${baseUrl}/global-settings/basic-info/view/languages/all`,
			},
			{
				source: "/global-settings/basic-info/view/language/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/language/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/language/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/language/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/language",
				destination: `${baseUrl}/global-settings/basic-info/create/language`,
			},
			{
				source: "/global-settings/basic-info/edit/language/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/language/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/language/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/language/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/academic-majors",
				destination: `${baseUrl}/global-settings/basic-info/view/academic-majors`,
			},
			{
				source: "/global-settings/basic-info/view/genders",
				destination: `${baseUrl}/global-settings/basic-info/view/genders`,
			},
			{
				source: "/global-settings/basic-info/view/genders/all",
				destination: `${baseUrl}/global-settings/basic-info/view/genders/all`,
			},
			{
				source: "/global-settings/basic-info/view/gender/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/gender/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/gender",
				destination: `${baseUrl}/global-settings/basic-info/create/gender`,
			},
			{
				source: "/global-settings/basic-info/edit/gender/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/gender/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/gender/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/gender/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/salary-period/all",
				destination: `${baseUrl}/global-settings/basic-info/view/salary-period/all`,
			},
			{
				source: "/global-settings/basic-info/create/salary-period",
				destination: `${baseUrl}/global-settings/basic-info/create/salary-period`,
			},
			{
				source: "/global-settings/basic-info/view/salary-period/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/salary-period/:id*`,
			},
			{
				source: "/global-settings/basic-info/edit/salary-period/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/salary-period/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/salary-period/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/salary-period/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/driving-licenses",
				destination: `${baseUrl}/global-settings/basic-info/view/driving-licenses`,
			},
			{
				source: "/global-settings/basic-info/view/driving-licenses/all",
				destination: `${baseUrl}/global-settings/basic-info/view/driving-licenses/all`,
			},
			{
				source: "/global-settings/basic-info/view/driving-license/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/driving-license/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/driving-license",
				destination: `${baseUrl}/global-settings/basic-info/create/driving-license`,
			},
			{
				source: "/global-settings/basic-info/edit/driving-license/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/driving-license/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/driving-license/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/driving-license/:id*`,
			},

			{
				source: "/global-settings/basic-info/view/employment-types/all",
				destination: `${baseUrl}/global-settings/basic-info/view/employment-types/all`,
			},
			{
				source: "/global-settings/basic-info/view/employment-types/all",
				destination: `${baseUrl}/global-settings/basic-info/view/employment-types/all`,
			},
			{
				source: "/global-settings/basic-info/view/employment-type/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/employment-type/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/employment-type",
				destination: `${baseUrl}/global-settings/basic-info/create/employment-type`,
			},
			{
				source: "/global-settings/basic-info/edit/employment-type/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/employment-type/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/employment-type/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/employment-type/:id*`,
			},
			{
				source: "/global-settings/basic-info/view/timezones/all",
				destination: `${baseUrl}/global-settings/basic-info/view/timezones/all`,
			},
			{
				source: "/global-settings/basic-info/view/timezones/all",
				destination: `${baseUrl}/global-settings/basic-info/view/timezones/all`,
			},
			{
				source: "/global-settings/basic-info/view/timezone/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/timezone/:id*`,
			},
			{
				source: "/global-settings/basic-info/create/timezone",
				destination: `${baseUrl}/global-settings/basic-info/create/timezone`,
			},
			{
				source: "/global-settings/basic-info/edit/timezone/:id*",
				destination: `${baseUrl}/global-settings/basic-info/edit/timezone/:id*`,
			},
			{
				source: "/global-settings/basic-info/delete/timezone/:id*",
				destination: `${baseUrl}/global-settings/basic-info/delete/timezone/:id*`,
			},
			{
				source: "/global-settings/translation/view/languages/all",
				destination: `${baseUrl}/global-settings/translation/view/languages/all`,
			},
			{
				source: "/global-settings/translation/view/sections/:id*",
				destination: `${baseUrl}/global-settings/translation/view/sections/:id*`,
			},
			{
				source:
					"/global-settings/translation/view/section/:languageId*/:sectionId*",
				destination: `${baseUrl}/global-settings/translation/view/section/:languageId*/:sectionId*`,
			},
			{
				source: "/global-settings/translation/edit",
				destination: `${baseUrl}/global-settings/translation/edit`,
			},
			{
				source: "/global-settings/basic-info/view/labels/:id*",
				destination: `${baseUrl}/global-settings/basic-info/view/labels/:id*`,
			},
			{
				source: "/global-settings/translation/edit/language/live/:id*",
				destination: `${baseUrl}/global-settings/translation/edit/language/live/:id*`,
			},
			{
				source: "/global-settings/translation/edit/language/add/:id*",
				destination: `${baseUrl}/global-settings/translation/edit/language/add/:id*`,
			},
			{
				source: "/global-settings/translation/edit/language/del/:id*",
				destination: `${baseUrl}/global-settings/translation/edit/language/del/:id*`,
			},
			{
				source: "/user-settings/user/view/notifications/all",
				destination: `${baseUrl}/user-settings/user/view/notifications/all`,
			},
			{
				source: "/user-settings/user/edit/notifications",
				destination: `${baseUrl}/user-settings/user/edit/notifications`,
			},
			{
				source: "/user-settings/user/view/privacy/all",
				destination: `${baseUrl}/user-settings/user/view/privacy/all`,
			},
			{
				source: "/user-settings/user/edit/privacy",
				destination: `${baseUrl}/user-settings/user/edit/privacy`,
			},
			{
				source: "/user-settings/user/edit/account/deactivation",
				destination: `${baseUrl}/user-settings/user/edit/account/deactivation`,
			},
			{
				source: "/user-settings/user/edit/account/delete",
				destination: `${baseUrl}/user-settings/user/edit/account/delete`,
			},
			{
				source: "/user-settings/user/edit/sidebar",
				destination: `${baseUrl}/user-settings/user/edit/sidebar`,
			},
			{
				source: "/global-settings/roles/view/all",
				destination: `${baseUrl}/global-settings/roles/view/all`,
			},
			{
				source: "/global-settings/roles/create",
				destination: `${baseUrl}/global-settings/roles/create`,
			},
			{
				source: "/global-settings/roles/edit/:id*",
				destination: `${baseUrl}/global-settings/roles/edit/:id*`,
			},
			{
				source: "/global-settings/roles/delete/:id*",
				destination: `${baseUrl}/global-settings/roles/delete/:id*`,
			},
			{
				source: "/global-settings/roles/edit/default/:id*",
				destination: `${baseUrl}/global-settings/roles/edit/default/:id*`,
			},
			{
				source: "/global-settings/roles/view/one/:roleId*/:skip*/:take*",
				destination: `${baseUrl}/global-settings/roles/view/one/:roleId*/:skip*/:take*`,
			},
			{
				source: "/global-settings/roles/view/not-members/:id*",
				destination: `${baseUrl}/global-settings/roles/view/not-members/:id*`,
			},
			{
				source: "/global-settings/roles/edit/add-members/:id*",
				destination: `${baseUrl}/global-settings/roles/edit/add-members/:id*`,
			},
			{
				source: "/global-settings/roles/view/permissions/:id*",
				destination: `${baseUrl}/global-settings/roles/view/permissions/:id*`,
			},
			{
				source: "/global-settings/roles/create/permission",
				destination: `${baseUrl}/global-settings/roles/create/permission`,
			},
			{
				source: "/global-settings/percentage/view/all",
				destination: `${baseUrl}/global-settings/percentage/view/all`,
			},
			{
				source: "/global-settings/percentage/edit",
				destination: `${baseUrl}/global-settings/percentage/edit`,
			},
			//***************************
			//End Setting
			//***************************

			//***************************
			//Start Profile
			//***************************
			{
				source: "/profile/my-profile/view/qr",
				destination: `${baseUrl}/profile/my-profile/view/qr`,
			},
			{
				source: "/profile/my-profile/edit/2fa/enable",
				destination: `${baseUrl}/profile/my-profile/edit/2fa/enable`,
			},
			{
				source: "/profile/my-profile/edit/2fa/disable",
				destination: `${baseUrl}/profile/my-profile/edit/2fa/disable`,
			},
			{
				source: "/profile/my-profile/view/personal-information",
				destination: `${baseUrl}/profile/my-profile/view/personal-information`,
			},
			{
				source: "/profile/my-profile/edit/personal-information",
				destination: `${baseUrl}/profile/my-profile/edit/personal-information`,
			},
			{
				source: "/profile/my-profile/view/other-information",
				destination: `${baseUrl}/profile/my-profile/view/other-information`,
			},
			{
				source: "/profile/my-profile/edit/other-information",
				destination: `${baseUrl}/profile/my-profile/edit/other-information`,
			},
			{
				source: "/profile/my-profile/view/security-information",
				destination: `${baseUrl}/profile/my-profile/view/security-information`,
			},
			{
				source: "/profile/my-profile/edit/security-information",
				destination: `${baseUrl}/profile/my-profile/edit/security-information`,
			},
			{
				source: "/profile/my-profile/view/otp/send",
				destination: `${baseUrl}/profile/my-profile/view/otp/send`,
			},
			{
				source: "/profile/my-profile/create/otp/verify",
				destination: `${baseUrl}/profile/my-profile/create/otp/verify`,
			},
			{
				source: "/profile/my-profile/view/description",
				destination: `${baseUrl}/profile/my-profile/view/description`,
			},
			{
				source: "/profile/my-profile/edit/description",
				destination: `${baseUrl}/profile/my-profile/edit/description`,
			},
			{
				source: "/global-settings/social-media/view/all",
				destination: `${baseUrl}/global-settings/social-media/view/all`,
			},
			{
				source: "/global-settings/social-media/view/one/:id*",
				destination: `${baseUrl}/global-settings/social-media/view/one/:id*`,
			},
			{
				source: "/global-settings/social-media/create",
				destination: `${baseUrl}/global-settings/social-media/create`,
			},
			{
				source: "/global-settings/social-media/edit/:id*",
				destination: `${baseUrl}/global-settings/social-media/edit/:id*`,
			},
			{
				source: "/global-settings/social-media/delete/:id*",
				destination: `${baseUrl}/global-settings/social-media/delete/:id*`,
			},
			{
				source: "/profile/my-profile/edit/avatar",
				destination: `${baseUrl}/profile/my-profile/edit/avatar`,
			},
			{
				source: "/profile/my-profile/delete/avatar",
				destination: `${baseUrl}/profile/my-profile/delete/avatar`,
			},
			{
				source: "/profile/my-profile/edit/banner",
				destination: `${baseUrl}/profile/my-profile/edit/banner`,
			},
			{
				source: "/profile/my-profile/view/socials",
				destination: `${baseUrl}/profile/my-profile/view/socials`,
			},
			{
				source: "/profile/my-profile/create/social",
				destination: `${baseUrl}/profile/my-profile/create/social`,
			},
			{
				source: "/profile/my-profile/view/social/:id*",
				destination: `${baseUrl}/profile/my-profile/view/social/:id*`,
			},
			{
				source: "/profile/my-profile/edit/social/:id*",
				destination: `${baseUrl}/profile/my-profile/edit/social/:id*`,
			},
			{
				source: "/profile/my-profile/delete/social/:id*",
				destination: `${baseUrl}/profile/my-profile/delete/social/:id*`,
			},
			{
				source: "/profile/my-profile/create/invitation",
				destination: `${baseUrl}/profile/my-profile/create/invitation`,
			},
			{
				source: "/profile/user-profiles/view/access/:id*",
				destination: `${baseUrl}/profile/user-profiles/view/access/:id*`,
			},
			{
				source: "/profile/user-profiles/create/access",
				destination: `${baseUrl}/profile/user-profiles/create/access`,
			},
			{
				source: "/profile/my-profile/view/percentage",
				destination: `${baseUrl}/profile/my-profile/view/percentage`,
			},
			{
				source: "/profile/resume/view/cv/:id*",
				destination: `${baseUrl}/profile/resume/view/cv/:id*`,
			},
			{
				source: "/pdf/download",
				destination: `${baseUrl}/pdf/download`,
			},
			//***************************
			//End Profile
			//***************************

			//***************************
			//Start Reusme
			//***************************
			{
				source: "/profile/resume/view/progress",
				destination: `${baseUrl}/profile/resume/view/progress`,
			},
			{
				source: "/profile/resume/view/educations",
				destination: `${baseUrl}/profile/resume/view/educations`,
			},
			{
				source: "/profile/resume/view/education/:id*",
				destination: `${baseUrl}/profile/resume/view/education/:id*`,
			},
			{
				source: "/profile/resume/create/education",
				destination: `${baseUrl}/profile/resume/create/education`,
			},
			{
				source: "/profile/resume/edit/education/:id*",
				destination: `${baseUrl}/profile/resume/edit/education/:id*`,
			},
			{
				source: "/profile/resume/delete/education/:id*",
				destination: `${baseUrl}/profile/resume/delete/education/:id*`,
			},

			{
				source: "/profile/resume/view/experiences",
				destination: `${baseUrl}/profile/resume/view/experiences`,
			},
			{
				source: "/profile/resume/view/experience/:id*",
				destination: `${baseUrl}/profile/resume/view/experience/:id*`,
			},
			{
				source: "/profile/resume/create/experience",
				destination: `${baseUrl}/profile/resume/create/experience`,
			},
			{
				source: "/profile/resume/edit/experience/:id*",
				destination: `${baseUrl}/profile/resume/edit/experience/:id*`,
			},
			{
				source: "/profile/resume/delete/experience/:id*",
				destination: `${baseUrl}/profile/resume/delete/experience/:id*`,
			},
			{
				source: "/profile/resume/view/skills",
				destination: `${baseUrl}/profile/resume/view/skills`,
			},
			{
				source: "/profile/resume/view/skill/:id*",
				destination: `${baseUrl}/profile/resume/view/skill/:id*`,
			},
			{
				source: "/profile/resume/create/skill",
				destination: `${baseUrl}/profile/resume/create/skill`,
			},
			{
				source: "/profile/resume/edit/skill/:id*",
				destination: `${baseUrl}/profile/resume/edit/skill/:id*`,
			},
			{
				source: "/profile/resume/delete/skill/:id*",
				destination: `${baseUrl}/profile/resume/delete/skill/:id*`,
			},

			{
				source: "/profile/resume/view/languages",
				destination: `${baseUrl}/profile/resume/view/languages`,
			},
			{
				source: "/profile/resume/view/language/:id*",
				destination: `${baseUrl}/profile/resume/view/language/:id*`,
			},
			{
				source: "/profile/resume/create/language",
				destination: `${baseUrl}/profile/resume/create/language`,
			},
			{
				source: "/profile/resume/edit/language/:id*",
				destination: `${baseUrl}/profile/resume/edit/language/:id*`,
			},
			{
				source: "/profile/resume/delete/language/:id*",
				destination: `${baseUrl}/profile/resume/delete/language/:id*`,
			},

			{
				source: "/profile/resume/view/expertises",
				destination: `${baseUrl}/profile/resume/view/expertises`,
			},
			{
				source: "/profile/resume/view/expertise/:id*",
				destination: `${baseUrl}/profile/resume/view/expertise/:id*`,
			},
			{
				source: "/profile/resume/create/expertise",
				destination: `${baseUrl}/profile/resume/create/expertise`,
			},
			{
				source: "/profile/resume/edit/expertise/:id*",
				destination: `${baseUrl}/profile/resume/edit/expertise/:id*`,
			},
			{
				source: "/profile/resume/delete/expertise/:id*",
				destination: `${baseUrl}/profile/resume/delete/expertise/:id*`,
			},

			{
				source: "/profile/resume/view/portfolios",
				destination: `${baseUrl}/profile/resume/view/portfolios`,
			},
			{
				source: "/profile/resume/view/portfolio/:id*",
				destination: `${baseUrl}/profile/resume/view/portfolio/:id*`,
			},
			{
				source: "/profile/resume/create/portfolio",
				destination: `${baseUrl}/profile/resume/create/portfolio`,
			},
			{
				source: "/profile/resume/edit/portfolio/:id*",
				destination: `${baseUrl}/profile/resume/edit/portfolio/:id*`,
			},
			{
				source: "/profile/resume/delete/portfolio/:id*",
				destination: `${baseUrl}/profile/resume/delete/portfolio/:id*`,
			},
			{
				source: "/profile/resume/edit/portfolio/:id*/delimage/:imageId*",
				destination: `${baseUrl}/profile/resume/edit/portfolio/:id*/delimage/:imageId*`,
			},

			{
				source: "/profile/resume/view/extra-activities",
				destination: `${baseUrl}/profile/resume/view/extra-activities`,
			},
			{
				source: "/profile/resume/view/extra-activity/:id*",
				destination: `${baseUrl}/profile/resume/view/extra-activity/:id*`,
			},
			{
				source: "/profile/resume/create/extra-activity",
				destination: `${baseUrl}/profile/resume/create/extra-activity`,
			},
			{
				source: "/profile/resume/edit/extra-activity/:id*",
				destination: `${baseUrl}/profile/resume/edit/extra-activity/:id*`,
			},
			{
				source: "/profile/resume/delete/extra-activity/:id*",
				destination: `${baseUrl}/profile/resume/delete/extra-activity/:id*`,
			},

			{
				source: "/profile/resume/view/interships",
				destination: `${baseUrl}/profile/resume/view/interships`,
			},
			{
				source: "/profile/resume/view/intership/:id*",
				destination: `${baseUrl}/profile/resume/view/intership/:id*`,
			},
			{
				source: "/profile/resume/create/intership",
				destination: `${baseUrl}/profile/resume/create/intership`,
			},
			{
				source: "/profile/resume/edit/intership/:id*",
				destination: `${baseUrl}/profile/resume/edit/intership/:id*`,
			},
			{
				source: "/profile/resume/delete/intership/:id*",
				destination: `${baseUrl}/profile/resume/delete/intership/:id*`,
			},

			{
				source: "/profile/resume/view/references",
				destination: `${baseUrl}/profile/resume/view/references`,
			},
			{
				source: "/profile/resume/view/reference/:id*",
				destination: `${baseUrl}/profile/resume/view/reference/:id*`,
			},
			{
				source: "/profile/resume/create/reference",
				destination: `${baseUrl}/profile/resume/create/reference`,
			},
			{
				source: "/profile/resume/edit/reference/:id*",
				destination: `${baseUrl}/profile/resume/edit/reference/:id*`,
			},
			{
				source: "/profile/resume/delete/reference/:id*",
				destination: `${baseUrl}/profile/resume/delete/reference/:id*`,
			},
			{
				source: "/profile/resume/edit/hobbies",
				destination: `${baseUrl}/profile/resume/edit/hobbies`,
			},
			{
				source: "/profile/resume/edit/additional-info",
				destination: `${baseUrl}/profile/resume/edit/additional-info`,
			},
			{
				source: "/profile/resume/edit/publications",
				destination: `${baseUrl}/profile/resume/edit/publications`,
			},
			{
				source: "/profile/resume/view/awards",
				destination: `${baseUrl}/profile/resume/view/awards`,
			},
			{
				source: "/profile/resume/view/award/:id*",
				destination: `${baseUrl}/profile/resume/view/award/:id*`,
			},
			{
				source: "/profile/resume/create/award",
				destination: `${baseUrl}/profile/resume/create/award`,
			},
			{
				source: "/profile/resume/edit/award/:id*",
				destination: `${baseUrl}/profile/resume/edit/award/:id*`,
			},
			{
				source: "/profile/resume/delete/award/:id*",
				destination: `${baseUrl}/profile/resume/delete/award/:id*`,
			},

			{
				source: "/profile/resume/view/courses",
				destination: `${baseUrl}/profile/resume/view/courses`,
			},
			{
				source: "/profile/resume/view/course/:id*",
				destination: `${baseUrl}/profile/resume/view/course/:id*`,
			},
			{
				source: "/profile/resume/create/course",
				destination: `${baseUrl}/profile/resume/create/course`,
			},
			{
				source: "/profile/resume/edit/course/:id*",
				destination: `${baseUrl}/profile/resume/edit/course/:id*`,
			},
			{
				source: "/profile/resume/delete/course/:id*",
				destination: `${baseUrl}/profile/resume/delete/course/:id*`,
			},
			//***************************
			//End Reusme
			//***************************

			//***************************
			//Start User Profile
			//***************************
			{
				source: "/profile/user-profiles/view/all/:skip*/:take*",
				destination: `${baseUrl}/profile/user-profiles/view/all/:skip*/:take*`,
			},
			{
				source: "/profile/user-profiles/view/search/:skip*/:take*",
				destination: `${baseUrl}/profile/user-profiles/view/search/:skip*/:take*`,
			},
			{
				source: "/profile/user-profiles/edit/approve/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/approve/:id*`,
			},
			{
				source: "/profile/user-profiles/edit/disapprove/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/disapprove/:id*`,
			},
			{
				source: "/profile/user-profiles/edit/suspend/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/suspend/:id*`,
			},
			{
				source: "/profile/user-profiles/edit/unsuspend/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/unsuspend/:id*`,
			},
			{
				source: "/profile/user-profiles/edit/disable/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/disable/:id*`,
			},
			{
				source: "/profile/user-profiles/edit/enable/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/enable/:id*`,
			},
			{
				source: "/profile/user-profiles/edit/like/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/like/:id*`,
			},
			{
				source: "/profile/user-profiles/view/one/:id*",
				destination: `${baseUrl}/profile/user-profiles/view/one/:id*`,
			},
			{
				source: "/profile/user-profiles/edit/change-status/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/change-status/:id*`,
			},
			{
				source: "/profile/user-profiles/view/personal-information/:id*",
				destination: `${baseUrl}/profile/user-profiles/view/personal-information/:id*`,
			},
			{
				source: "/profile/user-profiles/edit/personal-information/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/personal-information/:id*`,
			},
			{
				source: "/profile/user-profiles/view/other-information/:id*",
				destination: `${baseUrl}/profile/user-profiles/view/other-information/:id*`,
			},
			{
				source: "/profile/user-profiles/edit/other-information/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/other-information/:id*`,
			},
			{
				source: "/profile/user-profiles/view/security-information/:id*",
				destination: `${baseUrl}/profile/user-profiles/view/security-information/:id*`,
			},
			{
				source: "/profile/user-profiles/edit/security-information/:id*",
				destination: `${baseUrl}/profile/user-profiles/edit/security-information/:id*`,
			},
			//***************************
			//End User Profile
			//***************************
		];
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		config.plugins.push(
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery",
			})
		);
		return config;
	},
});
