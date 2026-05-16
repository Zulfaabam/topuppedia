---
name: Vibrant Connectivity
colors:
  surface: '#f8f9ff'
  surface-dim: '#d5dae6'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e9eefa'
  surface-container-high: '#e3e8f4'
  surface-container-highest: '#dde3ee'
  on-surface: '#161c24'
  on-surface-variant: '#3d494e'
  inverse-surface: '#2b3139'
  inverse-on-surface: '#ebf1fd'
  outline: '#6d797e'
  outline-variant: '#bcc8ce'
  surface-tint: '#006780'
  primary: '#006780'
  on-primary: '#ffffff'
  primary-container: '#00aed6'
  on-primary-container: '#003c4c'
  inverse-primary: '#52d5ff'
  secondary: '#006e1a'
  on-secondary: '#ffffff'
  secondary-container: '#88fc85'
  on-secondary-container: '#00751d'
  tertiary: '#8f4e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ee8500'
  on-tertiary-container: '#552c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b8eaff'
  primary-fixed-dim: '#52d5ff'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004d61'
  secondary-fixed: '#88fc85'
  secondary-fixed-dim: '#6cde6c'
  on-secondary-fixed: '#002203'
  on-secondary-fixed-variant: '#005312'
  tertiary-fixed: '#ffdcc2'
  tertiary-fixed-dim: '#ffb77a'
  on-tertiary-fixed: '#2e1500'
  on-tertiary-fixed-variant: '#6d3a00'
  background: '#f8f9ff'
  on-background: '#161c24'
  surface-variant: '#dde3ee'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered for an internet quota e-commerce platform that prioritizes speed, clarity, and approachability. The brand personality is optimistic and energetic, aiming to transform the utilitarian task of buying data into a seamless and pleasant experience. 

The visual style leans into **Modern Corporate with a Friendly twist**. It utilizes high-energy colors paired with a clean, systematic layout. The interface avoids clutter through generous whitespace and a "soft-touch" philosophy, where rounded corners and smooth transitions reduce friction and build trust with the user.

## Colors

The palette is derived from high-visibility vibrant tones that signal action and success.

- **Primary (Electric Blue):** Used for primary actions, progress indicators, and core branding. It represents the "digital" nature of the product.
- **Secondary (Eco Green):** Specifically reserved for positive outcomes, "Success" states, and promotional banners that imply savings.
- **Tertiary (Vibrant Orange):** Used as an accent for alerts, limited-time offers, or to draw attention to specific "Best Value" tags.
- **Neutral:** A scale of cool grays provides the structural framework, ensuring that the vibrant colors remain the focus without overwhelming the user.

## Typography

The design system utilizes **Inter** for all roles to maintain a clean, highly legible, and utilitarian feel. 

Headlines use a bold weight with slightly tightened letter spacing to create a strong visual anchor for product titles and section headers. Body text maintains a standard 1.5x line height ratio to ensure maximum readability during the selection of data plans. Label styles are used for metadata like "GB" counts or "validity periods" to provide clear hierarchy within small card components.

## Layout & Spacing

This design system uses a **Fluid Grid** model with a standard 12-column layout for desktop and a single-column layout for mobile. 

- **Vertical Rhythm:** Built on an 8px baseline grid to ensure consistent alignment.
- **Margins:** Desktop views utilize wide 64px side margins to focus content in the center, while mobile uses a tighter 16px margin to maximize screen real estate.
- **Sectioning:** Large 48px (xl) gaps are used between major content blocks (e.g., between "Promotions" and "Product Categories") to give the layout a spacious, premium feel.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layering** and **Ambient Shadows**. 

The background is a crisp white, while "Surface" containers (like product cards or input areas) use a very light gray (`#F3F4F5`) or a subtle 1px stroke. 

Shadows are soft and diffused, using the primary blue color at a very low opacity (e.g., 4-8%) for the "glow" effect on active elements or hovered cards. This creates a sense of depth that feels "light" rather than heavy or industrial.

## Shapes

The shape language is defined by **16px (rounded-lg)** corners for primary containers and cards. This significant radius softens the overall look of the platform, making it feel more like a lifestyle app than a financial tool. 

Smaller elements like buttons and input fields follow an 8px radius to maintain a precise, clickable feel. Tags and status indicators use a full pill-shape (999px) to distinguish them from interactive buttons.

## Components

- **Buttons:** Primary buttons use a solid Blue fill with white text. Ghost buttons use a 1.5px stroke in Blue. The corner radius is 8px for a balanced look.
- **Product Cards:** Must feature a white background with a 16px corner radius and a subtle gray border. On hover, the border transitions to the Primary Blue.
- **Data Inputs:** Use a 56px height for touch-friendly interaction on mobile. The "Nominal" or "Amount" selection should be presented in a clear, large-font dropdown or segmented picker.
- **Chips/Filters:** Used for carrier selection (e.g., Telkomsel, Indosat). These use the pill-shape with a light gray background, turning Blue when selected.
- **Status Badges:** "Best Seller" or "Promo" badges should use Tertiary Orange to contrast against the Primary Blue, placed in the top-right corner of cards.
- **Progress Bars:** Used for quota consumption visualizations, utilizing the Secondary Green to indicate "Data Remaining."