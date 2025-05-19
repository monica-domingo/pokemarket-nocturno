import '@testing-library/jest-dom';

// Mock ResizeObserver
class ResizeObserver {
    observe() {
    }

    unobserve() {
    }

    disconnect() {
    }
}

window.ResizeObserver = ResizeObserver;

// Mock pointer event methods
class MockPointerEvent extends Event {
    button: number;
    ctrlKey: boolean;
    pointerType: string;

    constructor(type: string, props: PointerEventInit) {
        super(type, props);
        this.button = props.button || 0;
        this.ctrlKey = props.ctrlKey || false;
        this.pointerType = props.pointerType || 'mouse';
    }
}

window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.setPointerCapture = function () {
};
window.HTMLElement.prototype.releasePointerCapture = function () {
};
window.HTMLElement.prototype.hasPointerCapture = function () {
    return false;
};

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = function () {
};

// Mock getBoundingClientRect
window.HTMLElement.prototype.getBoundingClientRect = function () {
    return {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => {
        }
    };
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock getComputedStyle
window.getComputedStyle = vi.fn().mockReturnValue({
    getPropertyValue: vi.fn().mockReturnValue(''),
    setProperty: vi.fn(),
});

// Mock Element.prototype.animate if needed
if (!window.Element.prototype.animate) {
    window.Element.prototype.animate = vi.fn().mockReturnValue({
        finished: Promise.resolve(),
        cancel: vi.fn(),
        pause: vi.fn(),
        play: vi.fn(),
        reverse: vi.fn(),
    });
}
