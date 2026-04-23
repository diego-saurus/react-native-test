import { fireEvent, render } from "@testing-library/react-native"
import { usePathname } from "expo-router"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import FloatingNavbar from "../floating-navbar"

jest.mock("expo-router", () => ({
  usePathname: jest.fn(),
  Link: ({ children, href, style, asChild, ...props }: any) => {
    const React = require("react")
    if (asChild) {
      return React.cloneElement(children, { ...props, onPress: () => {} })
    }
    return children
  },
}))

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(),
}))

describe("FloatingNavbar", () => {
  beforeEach(() => {
    ;(usePathname as jest.Mock).mockReturnValue("/")
    ;(useSafeAreaInsets as jest.Mock).mockReturnValue({ bottom: 0, top: 0, left: 0, right: 0 })
  })

  it("toggles search visibility when search icon is pressed", () => {
    const { getByPlaceholderText, queryByPlaceholderText, getByLabelText } = render(<FloatingNavbar />)

    expect(queryByPlaceholderText("Search images...")).toBeNull()

    const searchButton = getByLabelText("Search")

    fireEvent.press(searchButton)

    expect(getByPlaceholderText("Search images...")).toBeTruthy()

    fireEvent.press(searchButton)

    expect(queryByPlaceholderText("Search images...")).toBeNull()
  })
})
