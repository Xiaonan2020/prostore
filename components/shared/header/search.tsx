import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllCategories } from '@/lib/actions/product.actions';
import { SearchIcon } from 'lucide-react';

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <form action='/search' method='GET'>
      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Select name='category' defaultValue='all'>
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder='All'  />
          </SelectTrigger>
          <SelectContent >
            <SelectItem key={'All'} value={'all'} >
              All
            </SelectItem>
            {categories.map((x) => (
              <SelectItem key={x.category} value={x.category}>
                {x.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name='q'
          type='text'
          placeholder='Search...'
          className='w-[100px] md:w-[100px] lg:w-[300px] mr-0 rounded-r-none'
        />
        <Button className='rounded-l-none'>
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

export default Search;