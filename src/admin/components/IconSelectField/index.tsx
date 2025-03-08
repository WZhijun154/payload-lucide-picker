'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useField } from '@payloadcms/ui';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import { LucideIconPickerType } from '@/fields/LucideIconPicker';
import './index.scss';

// Predefined options for size and stroke width
const PREDEFINED_SIZES = [16, 20, 24, 32, 40, 48, 64];
const PREDEFINED_STROKE_WIDTHS = [0.5, 1, 1.5, 2, 2.5, 3];

// Color palette type
interface ColorOption {
  value: string;
  tooltip: string;
}

// Color palette with more options and organized by color groups
const COLOR_PALETTE: ColorOption[] = [
  {
    value: 'currentColor',
    tooltip: 'Uses the text color from your frontend theme (recommended for consistent styling)',
  },
  // Monochrome
  { value: '#000000', tooltip: 'Black' },
  { value: '#ffffff', tooltip: 'White' },
  { value: '#64748b', tooltip: 'Slate' },
  // Reds
  { value: '#ef4444', tooltip: 'Red' },
  { value: '#dc2626', tooltip: 'Red (Dark)' },
  { value: '#fca5a5', tooltip: 'Red (Light)' },
  // Oranges
  { value: '#f97316', tooltip: 'Orange' },
  { value: '#ea580c', tooltip: 'Orange (Dark)' },
  { value: '#fdba74', tooltip: 'Orange (Light)' },
  // Yellows
  { value: '#f59e0b', tooltip: 'Amber' },
  { value: '#d97706', tooltip: 'Amber (Dark)' },
  { value: '#fcd34d', tooltip: 'Amber (Light)' },
  // Greens
  { value: '#22c55e', tooltip: 'Green' },
  { value: '#16a34a', tooltip: 'Green (Dark)' },
  { value: '#86efac', tooltip: 'Green (Light)' },
  // Teals
  { value: '#14b8a6', tooltip: 'Teal' },
  { value: '#0d9488', tooltip: 'Teal (Dark)' },
  { value: '#5eead4', tooltip: 'Teal (Light)' },
  // Blues
  { value: '#3b82f6', tooltip: 'Blue' },
  { value: '#2563eb', tooltip: 'Blue (Dark)' },
  { value: '#93c5fd', tooltip: 'Blue (Light)' },
  // Purples
  { value: '#a855f7', tooltip: 'Purple' },
  { value: '#9333ea', tooltip: 'Purple (Dark)' },
  { value: '#d8b4fe', tooltip: 'Purple (Light)' },
  // Pinks
  { value: '#ec4899', tooltip: 'Pink' },
  { value: '#db2777', tooltip: 'Pink (Dark)' },
  { value: '#f9a8d4', tooltip: 'Pink (Light)' },
];

// Default icon configuration
const DEFAULT_ICON_CONFIG = {
  name: '',
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  absoluteStrokeWidth: false,
};

// Custom hook for debouncing
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Define proper props type for the component
type IconSelectFieldProps = {
  path: string;
  field: {
    label: string;
  };
}

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

// Preload and cache icons to improve performance
const iconCache: Record<string, React.ComponentType<LucideProps>> = {};

export const Icon = React.memo(({ name, ...props }: IconProps) => {
  // Use cached icon component if available
  if (!iconCache[name]) {
    iconCache[name] = dynamic(dynamicIconImports[name]);
  }

  const LucideIcon = iconCache[name];
  return <LucideIcon {...props} />;
});

Icon.displayName = 'Icon';

// Maximum number of icons to show per page
const ICONS_PER_PAGE = 60;

export const IconSelectField: React.FC<IconSelectFieldProps> = (props) => {
  const { 
    path,
    field
  } = props;

  const label = field.label;
  
  const { value = DEFAULT_ICON_CONFIG, setValue } = useField<LucideIconPickerType>({ path });
  
  const [fieldIsFocused, setFieldIsFocused] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(0);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Debounce search for better performance
  const debouncedSearch = useDebounce(search, 300);
  
  // Memoize all icons
  const allIcons = useMemo(() => 
    Object.keys(dynamicIconImports).sort(),
    []
  );

  // Filter icons based on debounced search
  const filteredIcons = useMemo(() => {
    if (!debouncedSearch) return allIcons;
    
    return allIcons.filter(name => 
      name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, allIcons]);

  const totalPages = Math.ceil(filteredIcons.length / ICONS_PER_PAGE);
  
  // Get the current page of icons
  const paginatedIcons = useMemo(() => {
    return filteredIcons.slice(
      page * ICONS_PER_PAGE, 
      (page + 1) * ICONS_PER_PAGE
    );
  }, [filteredIcons, page]);

  // Preload common icons on component mount for fast initial render
  useEffect(() => {
    const popularIcons = ['check', 'x', 'user', 'settings', 'home', 'search']
      .filter(name => name in dynamicIconImports);
    
    popularIcons.forEach(name => {
      if (!iconCache[name]) {
        iconCache[name] = dynamic(dynamicIconImports[name as keyof typeof dynamicIconImports]);
      }
    });
  }, []);

  // Reset page when search changes
  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  // Handle icon selection
  const handleIconSelect = useCallback((iconName: string) => {
    setValue({
      ...value,
      name: iconName,
    });
    setFieldIsFocused(false);
    setSearch('');
  }, [setValue, value]);

  // Handle configuration changes
  const handleConfigChange = useCallback((field: keyof LucideIconPickerType, newValue: any) => {
    setValue({
      ...value,
      [field]: newValue,
    });
}, [setValue, value]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modalElement = document.querySelector('.icon-picker-modal');
      const fieldElement = document.querySelector('.icon-select-field');
      
      if (
        fieldIsFocused && 
        modalElement && 
        fieldElement && 
        !modalElement.contains(event.target as Node) && 
        !fieldElement.contains(event.target as Node)
      ) {
        setFieldIsFocused(false);
        setSearch('');
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fieldIsFocused]);

  // Handle reset to defaults
  const handleResetToDefaults = useCallback(() => {
    setValue({
      ...DEFAULT_ICON_CONFIG,
      name: value.name, // Preserve the selected icon
    });
    setShowResetConfirm(false);
  }, [setValue, value.name]);

  return (
    <div className="icon-select-field-container">
      <label className="field-label">
        <Icon name="palette" size={14} />
        {label}
      </label>
      <div className="icon-select-field">
        <div 
          className="icon-preview"
          onClick={() => setFieldIsFocused(true)}
          tabIndex={0}
          role="button"
          aria-label="Open icon selector"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setFieldIsFocused(true);
            }
          }}
        >
          {value.name ? (
            <Icon 
              name={value.name as keyof typeof dynamicIconImports}
              size={value.size}
              color={value.color}
              strokeWidth={value.strokeWidth}
              absoluteStrokeWidth={value.absoluteStrokeWidth}
              className="icon-preview__icon"
            />
          ) : (
            <span className="icon-preview__placeholder">Icon</span>
          )}
        </div>
        
        <input
          type="text"
          className="icon-select-dropdown"
          value={value.name ? value.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Select an icon...'}
          readOnly
          onClick={() => setFieldIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setFieldIsFocused(true);
            }
          }}
          aria-haspopup="true"
          aria-expanded={fieldIsFocused}
        />

        <button
          type="button"
          className="icon-config-button"
          onClick={(e) => {
            e.preventDefault();
            setShowConfig(!showConfig);
          }}
          aria-label="Configure icon"
        >
          <Icon name="settings" size={20} />
        </button>
        
        {showConfig && (
          <div className="icon-config-panel">
            <div className="icon-config-panel__header">
              <h3>Icon Configuration</h3>
              <button 
                type="button"
                onClick={() => setShowConfig(false)}
                className="icon-config-panel__close"
              >
                <Icon name="x" size={16} />
              </button>
            </div>
            <div className="icon-config-panel__content">
              <div className="icon-config-panel__field">
                <label htmlFor="icon-size">Size</label>
                <div className="icon-config-panel__options">
                  {PREDEFINED_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`icon-config-panel__option ${value.size === size ? 'icon-config-panel__option--selected' : ''}`}
                      onClick={() => handleConfigChange('size', size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <input
                  id="icon-size"
                  type="number"
                  value={value.size}
                  onChange={(e) => handleConfigChange('size', parseInt(e.target.value, 10))}
                  min={1}
                  max={100}
                  className="icon-config-panel__custom-input"
                  placeholder="Custom size..."
                />
              </div>

              <div className="icon-config-panel__field">
                <label htmlFor="icon-color">
                  Color
                </label>
                <div className="icon-config-panel__color-palette">
                  {COLOR_PALETTE.map((colorOption) => (
                    <button
                      key={colorOption.value}
                      type="button"
                      className={`icon-config-panel__color ${value.color === colorOption.value ? 'icon-config-panel__color--selected' : ''}`}
                      onClick={() => handleConfigChange('color', colorOption.value)}
                      style={{
                        backgroundColor: colorOption.value === 'currentColor' ? undefined : colorOption.value,
                        border: colorOption.value === '#ffffff' ? '1px solid var(--theme-elevation-150)' : 'none'
                      }}
                      title={colorOption.tooltip}
                      aria-label={`Select color: ${colorOption.tooltip}`}
                    >
                      {colorOption.value === 'currentColor' && (
                        <>
                          <Icon name="palette" size={14} />
                          <span>currentColor</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
                <input
                  id="icon-color"
                  type="text"
                  value={value.color}
                  onChange={(e) => handleConfigChange('color', e.target.value)}
                  placeholder="Custom color (hex, rgb, etc.)"
                  className="icon-config-panel__custom-input"
                />
              </div>

              <div className="icon-config-panel__field">
                <label htmlFor="icon-stroke-width">Stroke Width</label>
                <div className="icon-config-panel__options">
                  {PREDEFINED_STROKE_WIDTHS.map((width) => (
                    <button
                      key={width}
                      type="button"
                      className={`icon-config-panel__option ${value.strokeWidth === width ? 'icon-config-panel__option--selected' : ''}`}
                      onClick={() => handleConfigChange('strokeWidth', width)}
                    >
                      {width}
                    </button>
                  ))}
                </div>
                <input
                  id="icon-stroke-width"
                  type="number"
                  value={value.strokeWidth}
                  onChange={(e) => handleConfigChange('strokeWidth', parseFloat(e.target.value))}
                  min={0.1}
                  max={10}
                  step={0.1}
                  className="icon-config-panel__custom-input"
                  placeholder="Custom stroke width..."
                />
              </div>

              <div className="icon-config-panel__field">
                <label htmlFor="icon-absolute-stroke">
                  <input
                    id="icon-absolute-stroke"
                    type="checkbox"
                    checked={value.absoluteStrokeWidth}
                    onChange={(e) => handleConfigChange('absoluteStrokeWidth', e.target.checked)}
                  />
                  Absolute Stroke Width
                </label>
              </div>

              <div className="icon-config-panel__footer">
                <button
                  type="button"
                  className="icon-config-panel__reset"
                  onClick={() => setShowResetConfirm(true)}
                >
                  <Icon name="rotate-ccw" size={14} />
                  Restore Defaults
                </button>
              </div>
            </div>
          </div>
        )}

        {showResetConfirm && (
          <div className="icon-config-confirm">
            <div className="icon-config-confirm__content">
              <div className="icon-config-confirm__header">
                <h3>Reset Configuration</h3>
                <button 
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="icon-config-confirm__close"
                >
                  <Icon name="x" size={16} />
                </button>
              </div>
              <div className="icon-config-confirm__body">
                <p>Are you sure you want to restore default configuration?</p>
                <p className="icon-config-confirm__note">
                  This will reset size, color, stroke width, and absolute stroke settings to their default values. The selected icon will be preserved.
                </p>
              </div>
              <div className="icon-config-confirm__actions">
                <button
                  type="button"
                  className="icon-config-confirm__cancel"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="icon-config-confirm__confirm"
                  onClick={handleResetToDefaults}
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )}
        
        {fieldIsFocused && (
          <div 
            className="icon-picker-modal"
            aria-label="Icon Picker"
            role="dialog"
          >
            <div className="icon-picker-modal__header">
              <h2 className="icon-picker-modal__title">Select an Icon</h2>
              <button 
                type="button"
                className="icon-picker-modal__close"
                onClick={(e) => {
                  e.preventDefault();
                  setFieldIsFocused(false);
                  setSearch('');
                }}
                aria-label="Close dialog"
              >
                <Icon name="x" size={20} />
              </button>
            </div>
            
            <div className="icon-picker-modal__search">
              <input
                type="search"
                placeholder={hoveredIcon || "Search icons..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="icon-picker-modal__search-input"
                autoFocus
              />
            </div>
            
            <div className="icon-picker-modal__pagination-info">
              Showing {paginatedIcons.length} of {filteredIcons.length} icons
            </div>
            
            <div className="icon-picker-modal__icons">
              {paginatedIcons.length > 0 ? (
                paginatedIcons.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    className={`icon-picker-modal__icon ${value.name === iconName ? 'icon-picker-modal__icon--selected' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleIconSelect(iconName);
                    }}
                    onMouseOver={() => setHoveredIcon(iconName)}
                    onMouseOut={() => setHoveredIcon(null)}
                    title={iconName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    aria-selected={value.name === iconName}
                    aria-label={iconName.replace(/-/g, ' ')}
                  >
                    <Icon 
                      name={iconName as keyof typeof dynamicIconImports} 
                      size={value.size}
                      color={value.color}
                      strokeWidth={value.strokeWidth}
                      absoluteStrokeWidth={value.absoluteStrokeWidth}
                    />
                    <span className="icon-picker-modal__icon-name">
                      {iconName.replace(/-/g, ' ')}
                    </span>
                  </button>
                ))
              ) : (
                <div className="icon-picker-modal__no-results">
                  No icons found matching {debouncedSearch}
                </div>
              )}
            </div>
            
            {totalPages > 1 && (
              <div className="icon-picker-modal__pagination">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p => Math.max(0, p - 1));
                  }}
                  disabled={page === 0}
                  className="icon-picker-modal__pagination-button"
                  aria-label="Previous page"
                >
                  <Icon name="chevron-left" size={16} />
                  Previous
                </button>
                
                <span className="icon-picker-modal__pagination-text">
                  Page {page + 1} of {totalPages}
                </span>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p => Math.min(totalPages - 1, p + 1));
                  }}
                  disabled={page === totalPages - 1}
                  className="icon-picker-modal__pagination-button"
                  aria-label="Next page"
                >
                  Next
                  <Icon name="chevron-right" size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IconSelectField; 