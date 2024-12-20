import { useEffect, useState } from 'react';

const availableCats = [
  { name: 'Whiskers', age: '2', breed: 'Sphynx' },
  { name: 'Mittens', age: '2', breed: 'Peterbald' },
  { name: 'Shadow', age: '1', breed: 'Birman' },
  { name: 'Pumpkin', age: '3', breed: 'Abyssinian' },
  { name: 'Luna', age: '4', breed: 'Persian' },
  { name: 'Simba', age: '2', breed: 'Bengal' },
  { name: 'Socks', age: '3',breed: 'The Ragdoll' },
  { name: 'Mocha', age: '1',breed: 'Korat'},
  { name: 'Ziggy', age: '2' ,breed: 'Minskin'},


];

export default function AvailableCats() {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const responses = await Promise.all(
          availableCats.map(() =>
            fetch('https://api.thecatapi.com/v1/images/search').then((res) =>
              res.json()
            )
          )
        );
        const catsWithImages = availableCats.map((cat, index) => ({
          ...cat,
          image: responses[index][0].url,
        }));

        setCats(catsWithImages);
        setFilteredCats(catsWithImages); //----------------------------------------------------------------
      } catch (error) {
        console.error('Error fetching cat images:', error);
      }
    };

    fetchCatImages();
  }, []);

  // handle search func.
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterCats(query, selectedBreed);
  };

  //breed func.
  const handleBreedFilter = (e) => {
    const breed = e.target.value;
    setSelectedBreed(breed);
    filterCats(searchQuery, breed);
  };


//filter func.
  const filterCats = (query, breed) => {
    let filtered = cats;

    if (query) {
      filtered = filtered.filter((cat) =>
        cat.name.toLowerCase().includes(query)
      );
    }

    if (breed) {
      filtered = filtered.filter((cat) => cat.breed === breed);
    }

    setFilteredCats(filtered);
  };

  return (
    <>
      <section className="text-center mt-4">
        <h2>Available Cats</h2>
        <p>Meet our adorable cats looking for their forever home!</p>

        {/* ---------------------------------------------------- */}
        <div className="filters mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <select
            value={selectedBreed}
            onChange={handleBreedFilter}
            style={{ padding: '5px' }}
          >
            <option value="">All Breeds</option>
            <option value="Sphynx">Sphynx</option>
            <option value="Peterbald">Peterbald</option>
            <option value="Birman">Birman</option>
            <option value="Abyssinian">Abyssinian</option>
            <option value="Persian">Persian</option>
            <option value="Bengal">Bengal</option>
            <option value="Minskin">Minskin</option>
            <option value="Korat">Korat</option>
            <option value="The Ragdoll">The Ragdoll</option>


          </select>
        </div>

        {/* ---------------------------------------------------------- */}
        <div className="mt-4 cats-container">
          {filteredCats.length > 0 ? (
            filteredCats.map((cat, i) => (
              <div key={i} className="cat-card">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="cat-image"
                />
                <div className="cat-info">
                  <h3 className="h5 mb-1">{cat.name}</h3>
                  <p className="mb-0">Age: {cat.age}</p>
                  <p className="mb-0">Breed: {cat.breed}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading ... </p>
          )}
        </div>
      </section>
      {/* css work on the page */}

      <style>{`
        .cats-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .cat-card {
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          text-align: center;
          width: 300px;
        }
        .cat-image {
         background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 7px;
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 1px solid #ddd;
        }
        .cat-info {
          padding: 10px;
        }
      `}</style>
    </>
  );
}
