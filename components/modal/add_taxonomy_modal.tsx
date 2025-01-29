'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, XIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';

type Taxonomy = {
    id: number;
    repo_url: string;
    taxon_id: string | null;
    title: string;
    description: string | null;
    author_orcid: string | null;
    doc_url: string | null;
    purl: string | null;
    last_edited: Date;
    active: boolean;
    is_public: boolean;
};

interface AddTaxonModalProps {
  userEmail: string;
}

export default function AddTaxonModal({ userEmail }: AddTaxonModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taxonomies, setTaxonomies] = useState<Taxonomy[]>([]);
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<number | null>(null);
  const basePath = process.env.NEXT_PUBLIC_NEXT_CONFIG_BASE_PATH ?? ''
  
  useEffect(() => {
    async function fetchTaxonomies() {
      const response = await fetch(`${basePath}/api/addibleTaxonomies?userEmail=${encodeURIComponent(userEmail)}`);
      const taxonomies = await response.json();
      // console.log('Fetched taxonomies:', taxonomies);
      setTaxonomies(taxonomies);
    }
    fetchTaxonomies();
  }, [userEmail]);

  const onAddTaxonomy = async () => {
    if (selectedTaxonomy === null) return;

    const response = await fetch(`${basePath}/api/addUserTaxonomy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        taxonomyId: selectedTaxonomy,
      }),
    });

    if (response.ok) {
      console.log('Taxonomy added successfully');
      setIsModalOpen(false);
      window.location.reload(); // Refresh the page
    } else {
      console.error('Failed to add taxonomy');
    }
  };

  return (
    <div>
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Trigger asChild>
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle/> &nbsp; Add Taxonomy
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle">Add Taxonomy</Dialog.Title>
              <Dialog.Description className="DialogDescription text-sm">
                Select a taxonomy to add to your collection.
              </Dialog.Description>
              <Select.Root onValueChange={(value) => setSelectedTaxonomy(Number(value))}>
                <Select.Trigger className="SelectTrigger text-sm">
                  <Select.Value placeholder="Select a taxonomy" />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="SelectContent" position="popper" sideOffset={5}>
                  <Select.ScrollUpButton className="SelectScrollButton">
                    <ChevronUp />
                  </Select.ScrollUpButton>
                    <Select.Viewport className="SelectViewport">
                      {taxonomies.map((taxonomy) => (
                        <Select.Item key={taxonomy.id} value={String(taxonomy.id)} className="SelectItem text-sm">
                          <Select.ItemText>{taxonomy.repo_url}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="SelectScrollButton">
                      <ChevronDown />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
            <Dialog.Close asChild>
              {/* <button className="DialogSaveButton">Add</button> */}
              <Button variant="default" onClick={onAddTaxonomy}>Add</Button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="DialogCloseButton" aria-label="Close">
              <XIcon />
            </button>
          </Dialog.Close>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}