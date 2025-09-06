# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.2] - 2025-09-06

### Changed
- Update peer dependency `lucide-react` to `^0.542.0`
- Demo app dependency `lucide-react` bumped to `^0.542.0`

## [1.6.3] - 2025-09-06

### Fixed
- Use `lucide-react/dynamic` entrypoint for dynamic icon imports (fixes Next.js module resolution for latest Lucide)
- Rename package to `payload-lucide-picker-next` to publish under current account

## [1.6.4] - 2025-09-06

### Changed
- Refactor to use `DynamicIcon` component and `iconNames` from `lucide-react/dynamic` across the library and admin field UI
- Remove direct usage of `next/dynamic` and manual caching

## [1.0.0] - 2024-03-19

### Added
- Initial release
- Custom field for selecting and configuring Lucide icons in Payload CMS admin panel
- Features:
  - Icon selection from all available Lucide icons
  - Icon size configuration (16px, 20px, 24px, 32px, 48px)
  - Icon color configuration with predefined color palette
  - Icon stroke width configuration (1, 1.5, 2, 2.5, 3)
  - Reset to default configuration
  - Search functionality for icons
  - Accessible and keyboard-friendly interface
