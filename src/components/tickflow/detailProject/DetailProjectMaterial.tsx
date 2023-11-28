import { useState } from 'react';
import { Chip, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { PROJECT_DETAIL_MATERIAL_ICON } from '@constants';
import { useMaterialDocumentForm } from './MaterialDocumentForm';
import { useMaterialMenu } from './MaterialMenu';

export function DetailProjectMaterial() {
  const MATERIAL = [
    {
      name: 'Proposal',
      description: 'Bản thuyết minh dự án/đề tài.',
      content: {
        new: [
          {
            id: 'id',
            name: 'Proposal',
            lastUpdate: 'Modified 01 Feb, 2023',
            version: 'v2.0'
          }
        ],
        old: [{ id: 'id', name: 'Proposal', lastUpdate: 'Modified 01 Jan, 2023', version: 'v1.0' }]
      }
    },
    {
      name: 'Timeline',
      description: 'Tiến trình & kế hoạch thực hiện dự án.',
      content: {
        new: [
          { id: 'id', name: 'Front-end', lastUpdate: 'Modified 01 May, 2023', version: 'v1.0' },
          { id: 'id', name: 'Back-end', lastUpdate: 'Modified 01 April, 2023', version: 'v1.0' },
          { id: 'id', name: 'Design', lastUpdate: 'Modified 01 Feb, 2023', version: 'v1.0' },
          { id: 'id', name: 'Marketing', lastUpdate: 'Modified 01 Jan, 2023', version: 'v1.0' }
        ],
        old: []
      }
    },
    {
      name: 'Product',
      description: 'Sản phẩm cuối cùng khi kết thúc dự án.',
      content: {
        new: [
          { id: 'id', name: 'User Manual', lastUpdate: 'Modified 01 May, 2023', version: 'v1.0' },
          { id: 'id', name: 'Proposal', lastUpdate: 'Modified 01 Jan, 2023', version: 'v2.0' },
          { id: 'id', name: 'Website', lastUpdate: 'Modified 01 Jan, 2023', version: 'v1.0' }
        ],
        old: [
          { id: 'id', name: 'Proposal', lastUpdate: 'Modified 01 April, 2023', version: 'v4.0' },
          { id: 'id', name: 'Proposal', lastUpdate: 'Modified 01 April, 2023', version: 'v3.0' },
          { id: 'id', name: 'Proposal', lastUpdate: 'Modified 01 April, 2023', version: 'v2.0' }
        ]
      }
    },
    {
      name: 'User report',
      description: 'Thống kê tài nguyên sử dụng.',
      content: {
        new: [{ id: 'id', name: 'Database', lastUpdate: 'Modified 01 May, 2023', version: 'v1.0' }],
        old: []
      }
    },
    {
      name: 'Usage manual',
      description: 'aka Zinu.',
      content: {
        new: [],
        old: []
      }
    }
  ];

  const { openMaterialDocumentForm, MaterialDocumentForm } = useMaterialDocumentForm();
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo>({
    index: 0,
    name: '',
    description: '',
    icon: <></>,
    content: {
      new: [],
      old: []
    }
  });

  const { openMaterialMenu, MaterialMenu } = useMaterialMenu();

  return (
    <>
      <List>
        {MATERIAL.map((data, index) => {
          const handleMaterialMenu = () => {
            openMaterialMenu(data.name, data.description);
          };
          return (
            <div key={index} className='flex items-center justify-between'>
              <ListItem
                className='px-0 hover:bg-inherit focus:bg-inherit'
                onClick={() => {
                  setDocumentInfo({
                    index: index,
                    name: data.name,
                    description: data.description,
                    icon:
                      index < 3
                        ? PROJECT_DETAIL_MATERIAL_ICON.outline[index]
                        : PROJECT_DETAIL_MATERIAL_ICON.outline[3],
                    content: data.content
                  });
                  openMaterialDocumentForm();
                }}
              >
                <ListItemPrefix>
                  <Chip
                    color='gray'
                    value={
                      index < 3
                        ? PROJECT_DETAIL_MATERIAL_ICON.solid[index]
                        : PROJECT_DETAIL_MATERIAL_ICON.solid[3]
                    }
                    className='rounded-full p-2'
                  />
                </ListItemPrefix>
                <div className='flex flex-col'>
                  <Typography variant='h6'>
                    {data.name}
                    {index < 3 ? <span className='text-red-500'>*</span> : null}
                  </Typography>
                  <Typography variant='small'>{data.description}</Typography>
                </div>
              </ListItem>
              {index >= 3 && (
                <div>
                  <EllipsisHorizontalIcon
                    strokeWidth={2}
                    className='w-6 h-6 cursor-pointer hover:bg-gray-200 hover:rounded-full'
                    onClick={handleMaterialMenu}
                  />
                </div>
              )}
            </div>
          );
        })}
      </List>
      <MaterialDocumentForm documentInfo={documentInfo} />
      <MaterialMenu />
    </>
  );
}
