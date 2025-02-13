# Changelog
All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.1.1] - 2021-07-14

### Fixed
- We have fixed the dynamic marker data source consistency check for MX 9.2 and above.

### Added
- Structure preview for maps
- Added consistency check to throw an error if minimum zoom level is **greater** than the maximum zoom level.
- Added consistency check to throw an error if default zoom level is **smaller** than the minimum zoom level.
- Added consistency check to throw an error if default zoom level is **greater** than the maximum zoom level.
- We added the option to use dynamic markers.

### Changed
- We now hide widget properties when they are not needed.

### Fixed
- We fixed an issue where the default zoom level was not taken into account.
- We fixed an issue where the maps was invisible when placed inside of another widget without a fixed height.
- We fixed an issue where the maps showed the wrong location / "Fit to markers" didn't work when the minimum zoom level was not "World".
