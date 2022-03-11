import { registeredClasses } from '@/utils'
import Book from '@/classes/items/book'
import allBooks from '@/books'

const { Kick, Gun, Freeze, Knife, Luck, Roll, Virus, Bandage, Adrenaline } = registeredClasses
export const battleItems = [Kick, Gun, Freeze, Knife, Luck, Roll, Virus, Bandage, Adrenaline]

export const books = allBooks.map(book => new Book(book))
