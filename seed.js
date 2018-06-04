const { db, Gardener, Plot, Vegetable } = require("./models");

const seed = async () => {
  await db.sync({force: true})
  console.log('database synced!')

  const vegetables = await Promise.all([
    Vegetable.create({ name: "spinach", color: "green" }),
    Vegetable.create({ name: "carrot", color: "red" }),
    Vegetable.create({ name: "beet", color: "purple" }),
    Vegetable.create({ name: "cauliflower", color: "white" })
  ])
  console.log(`seeded ${vegetables.length} vegetables successfully`)
  const spinach = vegetables[0]
  const carrot = vegetables[1]
  const beet = vegetables[2]
  const cauliflower = vegetables[3]

  const gardeners = await Promise.all([
    Gardener.create({name: 'John Smith', age: 22}),
    Gardener.create({name: 'Jim Clark', age: 40})
  ])

  const johnSmith = gardeners[0]
  const jimClark = gardeners[1]

  console.log(`seeded ${gardeners.length} gardener(s) successfully`)

  const plots = await Promise.all([
    Plot.create({ size: 100, shaded: true, gardenerId: johnSmith.id}),
    Plot.create({ size: 200, shaded: false}),
    Plot.create({ size: 200, shaded: false})
  ])
  console.log(`seeded ${plots.length} plot(s) successfully`)
  const plot1 = plots[0]
  const plot2 = plots[1]
  const plot3 = plots[2]

  plot2.setGardener(johnSmith.id)
  plot3.setGardener(jimClark.id)

  const PlotVegetable = db.model('vegetable_plot')
  return PlotVegetable.create({vegetableId: carrot.id, plotId: plot1.id})

}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exit(1)
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')
