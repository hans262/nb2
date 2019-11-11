import { AssertionError } from "assert";

namespace TestTs3_7 {
  /**
   * Optional Chaining -> 可选链
   * Nullish Coalescing -> 空位合并
   * 
   */
  type AlbumAPIResponse = {
    title: string
    artist?: {
      name: string
      bio?: string
      previousAlbums?: string[]
    }
  }

  const album: AlbumAPIResponse = {
    title: 'ww',
    // artist: {
    //   name: 'asd',
    //   bio: 'www'
    // }
  }

  const artistBio = album.artist?.bio ?? 'hag'
  console.log(artistBio)

  /**
   * 断言签名
   * 更加安全的never返回
   * 
   */
  function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (val === undefined || val === null) {
      throw new AssertionError({ message: `Expected 'val' to be defined, but received ${val}` })
    }
  }
  assertIsDefined(undefined)

  function assertIsString(val: any): asserts val is string {
    if (typeof val !== "string") {
      throw new AssertionError({ message: 'Not a string!' })
    }
  }
  assertIsString('abc')

  function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
      throw new AssertionError({ message: msg })
    }
  }
  assert(null, 'val is undefined')

}
