class PokemonsController < ApplicationController
  
  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render(json: pokemon)
  end

  def destroy
    pokemon = Pokemon.find(params[:id]).destroy
    render json: {
      "message": 'Successfully deleted.',
      "id": pokemon.id,
      "nickname": pokemon.nickname,
      "species": pokemon.species,
      "trainer_id": pokemon.trainer.id
    }
  end
end
