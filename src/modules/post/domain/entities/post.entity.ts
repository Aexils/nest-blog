export class Post {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public authorId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
