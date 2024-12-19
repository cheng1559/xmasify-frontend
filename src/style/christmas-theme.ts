
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const christmasTheme: CustomThemeConfig = {
    name: 'christmas-theme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `system-ui`,
        "--theme-font-family-heading": `system-ui`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "24px",
        "--theme-rounded-container": "24px",
        "--theme-border-base": "2px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "var(--color-primary-900)",
        "--on-secondary": "255 255 255",
        "--on-tertiary": "0 0 0",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "255 255 255",
        "--on-surface": "var(--color-primary-900)",
        // =~= Theme Colors  =~=
        // primary | #81a85f
        "--color-primary-50": "236 242 231", // #ecf2e7
        "--color-primary-100": "230 238 223", // #e6eedf
        "--color-primary-200": "224 233 215", // #e0e9d7
        "--color-primary-300": "205 220 191", // #cddcbf
        "--color-primary-400": "167 194 143", // #a7c28f
        "--color-primary-500": "129 168 95", // #81a85f
        "--color-primary-600": "116 151 86", // #749756
        "--color-primary-700": "97 126 71", // #617e47
        "--color-primary-800": "77 101 57", // #4d6539
        "--color-primary-900": "63 82 47", // #3f522f
        // secondary | #e7ae52
        "--color-secondary-50": "251 243 229", // #fbf3e5
        "--color-secondary-100": "250 239 220", // #faefdc
        "--color-secondary-200": "249 235 212", // #f9ebd4
        "--color-secondary-300": "245 223 186", // #f5dfba
        "--color-secondary-400": "238 198 134", // #eec686
        "--color-secondary-500": "231 174 82", // #e7ae52
        "--color-secondary-600": "208 157 74", // #d09d4a
        "--color-secondary-700": "173 131 62", // #ad833e
        "--color-secondary-800": "139 104 49", // #8b6831
        "--color-secondary-900": "113 85 40", // #715528
        // tertiary | #0EA5E9
        "--color-tertiary-50": "219 242 252", // #dbf2fc
        "--color-tertiary-100": "207 237 251", // #cfedfb
        "--color-tertiary-200": "195 233 250", // #c3e9fa
        "--color-tertiary-300": "159 219 246", // #9fdbf6
        "--color-tertiary-400": "86 192 240", // #56c0f0
        "--color-tertiary-500": "14 165 233", // #0EA5E9
        "--color-tertiary-600": "13 149 210", // #0d95d2
        "--color-tertiary-700": "11 124 175", // #0b7caf
        "--color-tertiary-800": "8 99 140", // #08638c
        "--color-tertiary-900": "7 81 114", // #075172
        // success | #84cc16
        "--color-success-50": "237 247 220", // #edf7dc
        "--color-success-100": "230 245 208", // #e6f5d0
        "--color-success-200": "224 242 197", // #e0f2c5
        "--color-success-300": "206 235 162", // #ceeba2
        "--color-success-400": "169 219 92", // #a9db5c
        "--color-success-500": "132 204 22", // #84cc16
        "--color-success-600": "119 184 20", // #77b814
        "--color-success-700": "99 153 17", // #639911
        "--color-success-800": "79 122 13", // #4f7a0d
        "--color-success-900": "65 100 11", // #41640b
        // warning | #EAB308
        "--color-warning-50": "252 244 218", // #fcf4da
        "--color-warning-100": "251 240 206", // #fbf0ce
        "--color-warning-200": "250 236 193", // #faecc1
        "--color-warning-300": "247 225 156", // #f7e19c
        "--color-warning-400": "240 202 82", // #f0ca52
        "--color-warning-500": "234 179 8", // #EAB308
        "--color-warning-600": "211 161 7", // #d3a107
        "--color-warning-700": "176 134 6", // #b08606
        "--color-warning-800": "140 107 5", // #8c6b05
        "--color-warning-900": "115 88 4", // #735804
        // error | #D41976
        "--color-error-50": "249 221 234", // #f9ddea
        "--color-error-100": "246 209 228", // #f6d1e4
        "--color-error-200": "244 198 221", // #f4c6dd
        "--color-error-300": "238 163 200", // #eea3c8
        "--color-error-400": "225 94 159", // #e15e9f
        "--color-error-500": "212 25 118", // #D41976
        "--color-error-600": "191 23 106", // #bf176a
        "--color-error-700": "159 19 89", // #9f1359
        "--color-error-800": "127 15 71", // #7f0f47
        "--color-error-900": "104 12 58", // #680c3a
        // surface | #f5f9f1
        "--color-surface-50": "254 254 253", // #fefefd
        "--color-surface-100": "253 254 252", // #fdfefc
        "--color-surface-200": "253 254 252", // #fdfefc
        "--color-surface-300": "251 253 249", // #fbfdf9
        "--color-surface-400": "248 251 245", // #f8fbf5
        "--color-surface-500": "245 249 241", // #f5f9f1
        "--color-surface-600": "221 224 217", // #dde0d9
        "--color-surface-700": "184 187 181", // #b8bbb5
        "--color-surface-800": "147 149 145", // #939591
        "--color-surface-900": "120 122 118", // #787a76

    }
}