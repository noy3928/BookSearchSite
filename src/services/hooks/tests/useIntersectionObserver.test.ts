import { renderHook, act } from "@testing-library/react-hooks"
import { useIntersectionObserver } from "./useIntersectionObserver"

describe("useIntersectionObserver", () => {
  let onIntersect: jest.Mock
  let observer: { observe: jest.Mock; disconnect: jest.Mock }

  // Before each test, set up a mock IntersectionObserver and assign to the global variable
  beforeEach(() => {
    onIntersect = jest.fn()
    observer = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    }

    // Mock the global IntersectionObserver
    ;(window as any).IntersectionObserver = jest.fn(() => observer)
  })

  test("화면에 관찰되면 callback이 실행된다.", () => {
    const { result } = renderHook(() =>
      useIntersectionObserver(onIntersect, {})
    )

    act(() => {
      const callback = (window as any).IntersectionObserver.mock
        .calls[0][0] as IntersectionObserverCallback
      const mockEntry: IntersectionObserverEntry = {
        isIntersecting: true,
        target: null as any,
        boundingClientRect: null as any,
        intersectionRatio: 0,
        intersectionRect: null as any,
        rootBounds: null,
        time: 0,
      }
      callback([mockEntry], observer as any)
    })

    expect(onIntersect).toHaveBeenCalled()
  })

  test("화면에 관찰되지 않는다면 callback이 실행되지 않는다.", () => {
    const { result } = renderHook(() =>
      useIntersectionObserver(onIntersect, {})
    )

    act(() => {
      const callback = (window as any).IntersectionObserver.mock
        .calls[0][0] as IntersectionObserverCallback
      const mockEntry: IntersectionObserverEntry = {
        isIntersecting: false,
        target: null as any,
        boundingClientRect: null as any,
        intersectionRatio: 0,
        intersectionRect: null as any,
        rootBounds: null,
        time: 0,
      }
      callback([mockEntry], observer as any)
    })

    expect(onIntersect).not.toHaveBeenCalled()
  })
})
